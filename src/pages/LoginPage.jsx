import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/context/AuthContext';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaGamepad, FaInfoCircle, FaTrophy } from 'react-icons/fa';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const { user, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    // Auto Redirect Logic: Login thakle direct game-e pathabe
    useEffect(() => {
        if (user) {
            navigate('/game');
        }
    }, [user, navigate]);

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                Swal.fire({
                    title: 'Welcome Back!',
                    text: `Ready to respect, ${result.user.displayName}?`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Login Error', 'Something went wrong. Please try again!', 'error');
            });
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
            <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl z-10"
            >
                {/* Logo & Title */}
                <div className="text-center mb-8">
                    <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="inline-block bg-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-500/50"
                    >
                        <FaGamepad className="text-4xl text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                        SHK <span className="text-blue-500">GAMES</span>
                    </h1>
                    <p className="text-gray-400 mt-2 font-medium italic">CR Respect Simulator v2.0</p>
                </div>

                {/* Instructions / How to Play */}
                <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5">
                    <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-3">
                        <FaInfoCircle /> কিভাবে খেলবেন?
                    </h3>
                    <ul className="text-gray-300 text-sm space-y-3">
                        <li className="flex gap-2">
                            <span className="text-blue-500 font-bold">১.</span> 
                            নিচের বাটনটি ক্লিক করে Google দিয়ে সাইন-ইন করুন।
                        </li>
                        <li className="flex gap-2">
                            <span className="text-blue-500 font-bold">২.</span> 
                            গেম পেজে গিয়ে স্ক্রিনে ট্যাপ করে আপনার সম্মান প্রদর্শন করুন।
                        </li>
                    </ul>
                </div>

                {/* Login Button */}
                <div className="space-y-4">
                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-4 bg-white hover:bg-gray-100 text-slate-900 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-xl"
                    >
                        <FcGoogle className="text-2xl" />
                        Sign Up / Login with Google
                    </button>
                    
                    <p className="text-center text-gray-500 text-xs mt-4">
                        By signing in, you agree to our Fun-Usage Policy. 
                        No data is shared outside this game.
                    </p>
                </div>

                {/* Feature Tags */}
                <div className="flex justify-center gap-4 mt-8 opacity-50">
                    <div className="flex items-center gap-1 text-[10px] text-white font-bold uppercase tracking-widest">
                        <FaTrophy className="text-yellow-500" /> Leaderboard
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Real-time Sync
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;