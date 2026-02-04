import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from './context/AuthContext';
import { FaUserSecret, FaGamepad, FaHome, FaBars, FaTimes, FaSignOutAlt, FaChevronRight, FaUserShield } from 'react-icons/fa';
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
    { name: 'Admin Panel', path: '/admin-dashboard', icon: <FaUserShield />, adminOnly: true }, // Ekhane FaUserShield use hoyeche
];

    return (
        <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm h-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                
                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 italic">
                    <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">SHK</span>
                    <span className="text-red-600 uppercase">Games</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8 font-bold text-gray-600">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-500"}>Home</NavLink>
                    {user && <NavLink to="/game" className={({ isActive }) => isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-500"}>Play Game</NavLink>}
                    {isAdmin && <NavLink to="/admin-dashboard" className="text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">Admin Panel</NavLink>}
                </div>

                {/* Desktop Actions */}
                <div className="flex items-center gap-3">
                    {/* Admin Entry - Desktop Only */}
                    {!user && !hasAdminAccess && (
                        <Link to="/admin-login" className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-blue-600 border border-gray-200 px-4 py-1.5 rounded-full uppercase tracking-widest transition-all">
                           <FaUserSecret /> Admin Entry
                        </Link>
                    )}

                    {user ? (
                        <div className="flex items-center gap-2 bg-gray-50 p-1 pr-3 rounded-full border">
                            <img src={user?.photoURL} className="w-8 h-8 rounded-full border-2 border-blue-500" alt="p" />
                            <button onClick={logOut} className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Logout</button>
                        </div>
                    ) : (
                        !hasAdminAccess && <Link to="/" className="hidden sm:block bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md">Login</Link>
                    )}

                    {/* Hamburger Button */}
                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-700">
                        <FaBars size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar (Premium Drawer) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden"
                        />
                        
                        {/* Sidebar */}
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white z-[120] shadow-2xl p-6 lg:hidden"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <span className="font-black text-xl text-blue-700 italic">MENU</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 bg-gray-100 rounded-full">
                                    <FaTimes />
                                </button>
                            </div>

                            <ul className="space-y-4 font-bold">
                                {navLinks.map((link) => (
                                    (!link.protected || user) && (!link.adminOnly || isAdmin) && (
                                        <li key={link.name}>
                                            <Link 
                                                to={link.path} 
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center justify-between p-4 rounded-2xl transition-all ${link.adminOnly ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                                            >
                                                <span className="flex items-center gap-3">{link.icon} {link.name}</span>
                                                <FaChevronRight className="text-xs opacity-30"/>
                                            </Link>
                                        </li>
                                    )
                                ))}

                                {/* Admin Entry in Mobile Sidebar - (Jodi keu login na thake) */}
                                {!user && !hasAdminAccess && (
                                    <li>
                                        <Link 
                                            to="/admin-login" 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800 text-white"
                                        >
                                            <FaUserSecret /> Admin Entry
                                        </Link>
                                    </li>
                                )}

                                {hasAdminAccess && (
                                    <li>
                                        <button 
                                            onClick={handleAdminLogout}
                                            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-600 text-white"
                                        >
                                            <FaSignOutAlt /> Logout Admin
                                        </button>
                                    </li>
                                )}
                            </ul>

                            <div className="absolute bottom-10 left-6 right-6 text-center">
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">SHK Games v1.0</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;