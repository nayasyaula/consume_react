import { useEffect, useRef, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UserEdit() {
    const [forms, setForms] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    })
    const [error, setError] = useState([])


    const params = useParams()
    const id = params.id

    const navigate = useNavigate()

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    useEffect(() => {
        instance.get(`user/${id}`)
        .then(res => {
            setForms(res.data.data)
        })
        .catch(err => {
            console.log(err.response)
        })
     }, [])

     const handleEditUser = (event) => {
        event.preventDefault();
        
        instance.put(`user/${id}`, forms)
        .then(res => {
            navigate('/user');
        })
        .catch(err => {
            setError(err.response.data.data)
            console.log(err.response)
        })
     }
     return (
        <Case name='User Edit'>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            Object.entires(error).map(([key, value], i) => (
                                                <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="flex justify-center">
                        <h5 className="mb-1 m1-5 text-3x1 font-medium text-gray-900 dark:text-white">Stuff</h5>
                    </div>
                    <form onSubmit={handleEditUser} class="max-w-sm mx-auto">
                        <div class="mb-5">
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus-ring-blue-500 dark:focus-border-blue-500" defaultValue={forms.username} placeholder="Ketik Username" required
                            onChange={e => setForms({...forms, username: e.target.value})}></input>
                        </div>
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus-ring-blue-500 dark:focus-border-blue-500" defaultValue={forms.email} placeholder="Ketik Email" required
                            onChange={e => setForms({...forms, email: e.target.value})}></input>
                        </div>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus-ring-blue-500 dark:focus-border-blue-500" defaultValue={forms.password} placeholder="Ketik Password" required
                            onChange={e => setForms({...forms, password: e.target.value})}></input>
                        </div>
                        <div class="mb-5">
                            <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select id="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                            dark border--gray 600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setForms({...forms, role: e.target.value})}>
                                <option selected>Pilih Kategori</option>
                                <option value="admin" selected={forms.role == 'admin' ? 'selected' : ''}>Admin</option>
                                <option value="staff" selected={forms.role == 'staff' ? 'selected' : ''}>Staff</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 
                            py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ubah</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
     )
}