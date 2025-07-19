'use client';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { url } from '../../mainurl';


export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', role: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/users/`, form);
            if (res.status === 201) {
                toast.success(res.data.message)
                navigate('/login');
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 shadow-lg rounded-lg bg-white text-center">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type='text' className="w-full border p-2" placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <input type='email' className="w-full border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    <div className="flex gap-4 items-center text-md mb-4">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={form.role === "admin"}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className="accent-blue-600"
                                required
                            />
                            Admin
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="role"
                                value="employer"
                                checked={form.role === "employer"}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className="accent-blue-600"
                                required
                            />
                            Employer
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="role"
                                value="applicant"
                                checked={form.role === "applicant"}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className="accent-blue-600"
                                required
                            />
                            Applicant
                        </label>
                    </div>
                    <input className="w-full border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded" type="submit">Register</button>
                    <p className="mt-4 text-sm">
                        Already Registered ? <Link to="/login" className="text-blue-600">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
