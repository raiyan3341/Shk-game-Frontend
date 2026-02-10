import React from 'react';
import { FaFacebook, FaGithub, FaGamepad, FaCode, FaHeart, FaTerminal } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-[#020617] text-gray-400 py-16 mt-20 border-t-2 border-[#00ffcc33] overflow-hidden">
            {/* Cyber Background Glows */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff0055]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="bg-[#ff0055] p-3 rounded-2xl shadow-[0_0_20px_#ff0055aa] group-hover:rotate-12 transition-transform duration-300">
                                <FaGamepad className="text-black text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter italic flex flex-col leading-none">
                                    <span className="text-white">SHK</span>
                                    <span className="text-[#00ffcc] text-sm tracking-[0.4em] not-italic">GAMES_V2</span>
                                </h2>
                            </div>
                        </div>
                        <p className="text-xs font-mono text-slate-500 max-w-xs text-center md:text-left leading-relaxed">
                             MISSION: ULTIMATE RESPECT SIMULATOR <br />
                             STATUS: ONLINE_STABLE <br />
        
                        </p>
                    </div>

                    {/* Developer Credit - Middle Focus */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group cursor-crosshair">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0055] to-[#00ffcc] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                            <div className="relative flex items-center gap-4 px-8 py-4 bg-black border border-white/10 rounded-2xl backdrop-blur-xl">
                                <FaTerminal className="text-[#00ffcc] animate-pulse" />
                                <div className="text-center">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-1">Develop By</p>
                                    <span className="text-white font-black tracking-widest text-lg group-hover:text-[#00ffcc] transition-colors">
                                        RAIYAN_SHEIKH
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="flex items-center gap-2 text-[10px] text-slate-600 uppercase font-bold tracking-tighter">
                            Designed with <FaHeart className="text-[#ff0055] animate-ping" /> for the community
                        </p>
                    </div>

                    {/* Social/Community Section */}
                    <div className="flex flex-col items-center md:items-end gap-5">
                        <h3 className="text-xs font-black text-[#00ffcc] uppercase tracking-[0.3em]">Join_The_Network</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-[#ff0055] hover:text-black hover:-translate-y-2 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-[#00ffcc] hover:text-black hover:-translate-y-2 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <FaGithub className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Cyber Footer Bar */}
                <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <span className="w-2 h-2 bg-[#00ffcc] rounded-full animate-pulse shadow-[0_0_10px_#00ffcc]"></span>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} SHK_ENT • ALL_SYSTEMS_GO
                        </p>
                    </div>
                    
                    <div className="flex gap-8 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy_Protocol</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms_Of_Service</span>
                        <span className="text-[#ff0055]/50 hover:text-[#ff0055] cursor-pointer transition-colors underline decoration-2 underline-offset-4">Report_Bug</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;