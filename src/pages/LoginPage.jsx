import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/context/AuthContext';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaGamepad, FaInfoCircle, FaTrophy, FaBolt, FaShieldAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const { user, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/game');
        }
    }, [user, navigate]);

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                Swal.fire({
                    title: '<span style="color:#00ffcc">WELCOME AGENT</span>',
                    html: `<p style="color:#fff">Mission Initialized for <b>${result.user.displayName}</b></p>`,
                    background: '#020617',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: 'border border-[#00ffcc33] rounded-3xl' }
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: 'Access Denied',
                    text: 'Authentication Protocol Failed!',
                    icon: 'error',
                    background: '#020617',
                    color: '#fff'
                });
            });
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 overflow-hidden relative font-mono">
            {/* Animated Cyber Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#00ffcc 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="absolute w-[500px] h-[500px] bg-[#ff0055]/10 rounded-full blur-[120px] -top-40 -left-40 animate-pulse"></div>
            <div className="absolute w-[500px] h-[500px] bg-[#00ffcc]/10 rounded-full blur-[120px] -bottom-40 -right-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 relative"
            >
                {/* Top Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff0055] text-white text-[10px] px-4 py-1 rounded-full font-black tracking-widest uppercase shadow-[0_0_15px_#ff0055]">
                    V2.0.4 Online
                </div>

                {/* Logo & Title */}
                <div className="text-center mb-10 mt-4">
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="inline-block relative"
                    >
                        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-40 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 p-5 rounded-3xl shadow-2xl mb-4 border border-white/20">
                            <FaGamepad className="text-5xl text-white" />
                        </div>
                    </motion.div>
                    
                    <h1 className="text-4xl font-black tracking-tighter italic">
                        <span className="text-white">SHK</span>
                        <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6]"> GAMES</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="h-[1px] w-8 bg-slate-700"></span>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Respect Simulator</p>
                        <span className="h-[1px] w-8 bg-slate-700"></span>
                    </div>
                </div>

                {/* Mission Objectives (How to Play) */}
                <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FaBolt className="text-4xl text-[#00ffcc]" />
                    </div>
                    
                    <h3 className="text-[#00ffcc] text-xs font-black flex items-center gap-2 mb-4 uppercase tracking-widest">
                        <FaShieldAlt className="animate-pulse" /> Mission_Objectives
                    </h3>
                    
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-start">
                            <span className="bg-white/10 text-white w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border border-white/10">01</span> 
                            <p className="text-slate-400 text-[11px] leading-relaxed">গেমটি খেলতে নিচে <span className="text-white">Google Login</span> করে নিন।</p>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="bg-white/10 text-white w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border border-white/10">02</span> 
                            <p className="text-slate-400 text-[11px] leading-relaxed">গেম জোনে প্রবেশ করে দ্রুত ট্যাপ করে <span className="text-white">Global Leaderboard</span>-এ জায়গা করে নিন।</p>
                        </li>
                    </ul>
                </div>

                {/* Cyber Login Button */}
                <div className="space-y-6">
                    <motion.button 
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-4 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                        <FcGoogle className="text-xl" />
                        Login with Google
                    </motion.button>
                    
                    <div className="text-center">
                        <p className="text-slate-600 text-[9px] uppercase tracking-widest font-bold">
                            Security_Status: <span className="text-green-500">Encrypted</span>
                        </p>
                    </div>
                </div>

                {/* Footer Badges */}
                <div className="flex justify-between items-center mt-10 px-2 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[9px] text-slate-500 font-black uppercase tracking-widest hover:text-yellow-500 transition-colors cursor-default">
                        <FaTrophy className="text-yellow-500" /> Champions League
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-slate-500 font-black uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div> 
                        Live_Server
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;