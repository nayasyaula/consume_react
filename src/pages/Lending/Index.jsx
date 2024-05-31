import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import Swal from "sweetalert2";


export default function Lending() {
    const [lendings, setLendings] = useState([])

    const [authUser, setAuthUser] = useState(null);

    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate()

    const [error, setError] = useState([])

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    useEffect(() => {

        instance.get('http://localhost:8000/profile')
            .then(res => {
                setIsLogin(true);
                setAuthUser(res.data.data);
            })
            .catch(err => {
                setIsLogin(false);
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
                }
            });

        instance.get('lending')
        .then( res => {
            setLendings(res.data.data)
            console.log(res.data.data)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'))
            }
        })
    }, [navigate])
    
    const deleteLending = (id) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Item akan dihapus sementara, kamu dapat restore stuff ini di page trash!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Melakukan request delete
                instance.delete(`lending/delete/${id}`)
                    .then(res => {
                        // Refresh halaman setelah berhasil menghapus
                        // location.reload();
                        // Menampilkan pesan berhasil dengan timer 3 detik
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Data berhasil dihapus.',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ya',
                        }).then((result) => {
                            location.reload();
                        })
                    })
                    .catch(err => {
                        // Menampilkan pesan error jika gagal
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ada kesalahan saat menghapus item.',
                            footer: '<a href="#">Hubungi admin jika masalah persist.</a>'
                        });
                    });
            }
        });
    };

    const viewLending = (id) => {
        instance.get(`lending/${id}`)
            .then(res => {
                const lending = res.data.data;
                Swal.fire({
                    title: "Detail Lending",
                    html: `
                        <hr>
                        <br>
                        <div class="mb-4">
                            <strong>Nama: </strong>${lending.name}</p>
                        </div>
                        <div class="mb-4">
                            <strong>Nama: </strong>${lending.user.username}</p>
                        </div>
                        <div class="mb-4">
                            <strong>Barang: </strong>${lending.stuff.name}
                        </div>
                        <div class="mb-4">
                            <strong>Total Pinjam: </strong>${lending.total_stuff}
                        </div>
                        <div class="mb-4">
                            <strong>Tanggal di pinjam: </strong>${lending.date_time}
                        </div>
                        <div class="mb-4">
                            <strong>Notes: </strong>${lending.notes}
                        </div>
                        <div class="mb-4">
                            <strong>Keterangan: </strong>${lending.restoration ? 'Sudah Kembali' : 'Belum Kembali'}
                        </div>
                    `,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Tutup'
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ada kesalahan saat mengambil detail lending.',
                    footer: '<a href="#">Hubungi admin jika masalah persist.</a>'
                });
            });
    };

    return(
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
                        <div className="whitespace-nowrap px-6 px-4">
                            {
                                isLogin && authUser && authUser.role === 'staff' ? (
                                    <Link to={"/lending/create"} className="px-4 py-2 mx-1 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                                        Tambah
                                        <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                                    </Link>
                                ) : ''
                            }
                            
                        </div>
                    </div>
                    {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    <li>
                                        {
                                            error.message
                                        }
                                    </li>
                                </ul>
                            </div>
                            </div>
                        ) : ''
                    }
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Nama</th>
                                    <th scope="col" className="px-6 py-4">Barang</th>
                                    <th scope="col" className="px-6 py-4">Tanggal</th>
                                    <th scope="col" className="px-6 py-4">Notes</th>
                                    <th scope="col" className="px-6 py-4">Keterangan</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {lendings.map((lending, id) => (
                                    <tr key={lending.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id+1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {lending.stuff.name}
                                            <br />
                                            Total Pinjam: {lending.total_stuff}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.date_time}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{lending.notes}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {
                                                lending.restoration ? (
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        Sudah Kembali
                                                    </td>
                                                ) : (
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        Belum Kembali
                                                    </td>
                                                )
                                            }
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {
                                                isLogin && authUser && authUser.role === 'admin' ? (
                                                    <button type="button" onClick={() => viewLending(lending.id)} className="px-4 py-2 bg-blue-500 rounded-lg mr-2 font-bold text-white">Lihat</button>
                                                ) : (
                                                    <>
                                                    <button type="button" onClick={() => viewLending(lending.id)} className="px-4 py-2 bg-blue-500 rounded-lg mr-2 font-bold text-white">Lihat</button>
                                                    <Link to={'/lending/restoration/' + lending.id} type="button" className="px-4 py-2 bg-green-500 rounded-lg mr-2 font-bold text-white">Kembali</Link>
                                                    <button type="button" onClick={() => deleteLending(lending.id)} className="px-4 py-2 bg-red-500 rounded-lg font-bold text-white">Batalkan</button>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ) )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    )
}
