import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from './context/AuthContext';
import { FaUserSecret, FaGamepad, FaHome, FaBars, FaTimes, FaSignOutAlt, FaChevronRight, FaUserShield, FaBolt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const hasAdminAccess = localStorage.getItem('shk_admin_access') === 'true';
    const isAdmin = (user?.email === adminEmail) || hasAdminAccess;

    const handleAdminLogout = () => {
        localStorage.removeItem('shk_admin_access');
        window.location.href = '/'; 
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <FaHome /> },
        { name: 'Play Game', path: '/game', icon: <FaGamepad />, protected: true },
        { name: 'Admin Panel', path: '/admin-dashboard', icon: <FaUserShield />, adminOnly: true },
    ];

    return (
        <nav className="sticky top-0 z-[100] bg-slate-950/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                
                {/* Brand Logo - Animated */}
                <Link to="/" className="group flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg shadow-[0_0_15px_#2563eb]">
                        <FaBolt className="text-white text-lg group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="text-2xl font-black tracking-tighter italic">
                        <span className="text-white">SHK</span>
                        <span className="text-red-500 uppercase ml-1 drop-shadow-[0_0_8px_#ef4444]">Games</span>
                    </div>
                </Link>

                {/* Desktop Menu - Cyber Style */}
                <div className="hidden lg:flex items-center space-x-2 font-black text-[11px] uppercase tracking-widest text-slate-400">
                    {navLinks.map((link) => (
                        (!link.protected || user) && (!link.adminOnly || isAdmin) && (
                            <NavLink 
                                key={link.name}
                                to={link.path} 
                                className={({ isActive }) => `
                                    px-5 py-2 rounded-full transition-all flex items-center gap-2
                                    ${isActive ? 'text-blue-400 bg-blue-500/10 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]' : 'hover:text-white hover:bg-white/5'}
                                    ${link.adminOnly ? 'text-red-500 border border-red-500/20 bg-red-500/5' : ''}
                                `}
                            >
                                {link.name}
                                {link.path === '/game' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>}
                            </NavLink>
                        )
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Admin Entry Badge */}
                    {!user && !hasAdminAccess && (
                        <Link to="/admin-login" className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-[#00ffcc] border border-white/10 px-4 py-2 rounded-xl uppercase tracking-widest transition-all bg-white/5">
                           <FaUserSecret /> <span className='hidden sm:block'>Admin Entry</span>
                        </Link>
                    )}

                    {user ? (
                        <div className="flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-2xl border border-white/10">
                            <img src={user?.photoURL} className="w-9 h-9 rounded-xl border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] object-cover" alt="p" />
                            <div className='flex flex-col'>
                                <span className='text-[8px] text-slate-500 font-bold uppercase'>Online</span>
                                <button onClick={logOut} className="text-[10px] font-black text-red-500 uppercase hover:text-red-400 transition-colors">Logout</button>
                            </div>
                        </div>
                    ) : (
                        !hasAdminAccess && <Link to="/" className="hidden sm:block bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_5px_15px_rgba(37,99,235,0.4)] active:scale-95 transition-all">Login</Link>
                    )}

                    {/* Hamburger Mobile */}
                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-3 bg-white/5 text-white rounded-xl border border-white/10">
                        <FaBars size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar (Premium Gaming Drawer) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] lg:hidden"
                        />
                        
                        <motion.div 
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-[85%] max-w-xs bg-slate-950 border-l border-white/10 z-[120] p-6 lg:hidden flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,1)]"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-black text-xs text-blue-500 tracking-[0.4em] uppercase italic">System_Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 bg-white/5 rounded-lg border border-white/10">
                                    <FaTimes />
                                </button>
                            </div>

                            <ul className="space-y-3 flex-1">
        {navLinks.map((link) => (
            (!link.protected || user) && (!link.adminOnly || isAdmin) && (
                <li key={link.name}>
                    <Link 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${link.adminOnly ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/5 text-slate-300'}`}
                    >
                        <span className="flex items-center gap-3 font-black uppercase text-[11px] tracking-widest">{link.icon} {link.name}</span>
                        <FaChevronRight className="text-[10px] opacity-30"/>
                    </Link>
                </li>
            )
        ))}

        {/* 🔴 FIXED: Admin Entry Button inside Mobile 3-dot Menu */}
        {!user && !hasAdminAccess && (
            <li className="pt-4 mt-4 border-t border-white/5">
                <Link 
                    to="/admin-login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-dashed border-white/20 text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.1)]"
                >
                    <FaUserSecret className="text-lg" />
                    <span className="font-black uppercase text-[11px] tracking-widest">Access Admin Terminal</span>
                </Link>
            </li>
        )}
    </ul>

                            <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
                                {hasAdminAccess && (
                                    <button 
                                        onClick={handleAdminLogout}
                                        className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-600 text-white font-black uppercase text-[10px] tracking-widest shadow-[0_5px_15px_rgba(220,38,38,0.3)]"
                                    >
                                        <FaSignOutAlt /> Close Admin Session
                                    </button>
                                )}
                                <div className="text-center">
                                    <p className="text-[9px] text-slate-600 font-bold tracking-[0.3em] uppercase underline decoration-blue-500/30">SHK Games v2.0.4</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;