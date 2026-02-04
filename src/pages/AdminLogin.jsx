import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Logic: Email o Password check kora
  const handleAdminLogin = (e) => {
    e.preventDefault();
    const CORRECT_PASS = import.meta.env.VITE_ADMIN_PASS;
    const CORRECT_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

    if (email === CORRECT_EMAIL && password === CORRECT_PASS) {
        // Admin access save koro
        localStorage.setItem('shk_admin_access', 'true');
        
        Swal.fire({
            icon: 'success',
            title: 'Admin Verified!',
            showConfirmButton: false,
            timer: 1500
        });

        // Dashboard-e pathiye dao
        navigate('/admin-dashboard'); 
    } else {
        Swal.fire('Error', 'Wrong Email or Password!', 'error');
    }
};

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 w-full max-w-sm shadow-2xl"
            >
                <h2 className="text-2xl font-black text-white text-center mb-6 uppercase tracking-tighter">
                    Admin <span className="text-red-500">Authentication</span>
                </h2>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase ml-1">Email Address</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-red-500 transition-all"
                            placeholder="admin@shk.com"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase ml-1">Secret Key (Pass)</label>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-red-500 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-95 uppercase"
                    >
                        Verify Admin
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;