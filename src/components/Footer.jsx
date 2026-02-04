import React from 'react';
import { FaFacebook, FaGithub, FaGamepad, FaCode, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-[#0f172a] text-gray-400 py-12 mt-20 overflow-hidden">
            {/* Background Decor (Optional) */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start space-y-3">
                        <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                            <div className="bg-green-500 p-2 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                                <FaGamepad className="text-white text-xl" />
                            </div>
                            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent italic">
                                SHK GAMES
                            </span>
                        </h2>
                        <p className="text-sm text-gray-500 max-w-xs text-center md:text-left leading-relaxed">
                            The ultimate CR respect paying simulator. <br />
                            Experience high-octane respect in every tap.
                        </p>
                    </div>

                    {/* Developer Credit Section */}
                    <div className="flex flex-col items-center group">
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-xl transition-all group-hover:border-green-500/50 group-hover:bg-white/10">
                            <FaCode className="text-green-500" />
                            <span className="text-xs uppercase tracking-[0.2em] font-medium text-gray-400">Developed By</span>
                            <span className="text-white font-black hover:text-green-400 transition-colors cursor-pointer">
                                Raiyan Sheikh
                            </span>
                        </div>
                        <p className="flex items-center gap-1 text-[10px] text-gray-600 mt-3 uppercase tracking-widest">
                            Made with <FaHeart className="text-red-500 animate-pulse" /> in Bangladesh
                        </p>
                    </div>

                    {/* Social Section */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Follow Community</p>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-gray-700 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                                <FaGithub className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium tracking-wide">
                    <p className="text-gray-500 uppercase">
                        &copy; {new Date().getFullYear()} SHK Entertainment • All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;