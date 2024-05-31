import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setIsLogin(true);
            setAuthUser(res.data.data);
            if (location.pathname === '/login') {
                navigate('/profile')
            }
        })
        .catch(err => {
            setIsLogin(false);
            if (err.response.status == 401 && location.pathname != '/login') {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, [navigate]);
    
    return (
        <div className="bg-blue-600 py-2">
            <div className="grid grid-cols-12">
                <section className="col-span-10 col-start-2">
                    <div className="flex items-center justify-between">
                        <div>
                        <Link
                            className="mr-2 text-sm font-semibold uppercase text-white ms 3"
                            to="/dashboard"
                        >
                            INVENTARIS APP
                        </Link>
                            
                        <Link to="/login" className="text-white">Login</Link>
                        {
                            isLogin ? authUser['role'] == 'admin' ? (
                                <>
                                <Link to ="/stuff" className="text-white ms-3">Stuff</Link>
                                <Link to ="/inbound" className="text-white ms-3">Inbound</Link>
                                <Link to ="/lending" className="text-white ms-3">Lending</Link>
                                <Link to ="/user" className="text-white ms-3">User</Link>
                                </>
                            ) : (
                                <Link to ="/lending" className="text-white ms-3">Lending</Link>
                            ) : ''
                        }
                        </div>
                        <Link to ="/profile" className="text-white">Profile</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}