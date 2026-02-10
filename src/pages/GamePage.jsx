import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { AuthContext } from '../components/context/AuthContext';

const GamePage = () => {
    const { user } = useContext(AuthContext);
    
    // Game States
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('shk_high_score')) || 0);
    const [targets, setTargets] = useState([]);
    const [stickers, setStickers] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [spawnSpeed, setSpawnSpeed] = useState(800);

    const playerName = localStorage.getItem('shk_player_name') || user?.displayName || "Agent X";

    // 🔴 FIX: Game Over Logic (Immediate Check)
    useEffect(() => {
        if (targets.length >= 10 && !isGameOver) {
            handleGameOver();
        }
    }, [targets.length]); // Track length closely

    // Difficulty Increase
    useEffect(() => {
        if (isGameOver || isPaused) return;
        const diffTimer = setInterval(() => {
            setSpawnSpeed(prev => Math.max(prev - 25, 250));
        }, 4000);
        return () => clearInterval(diffTimer);
    }, [isGameOver, isPaused]);

    // Spawning Logic
    useEffect(() => {
        if (isGameOver || isPaused) return;

        const spawnInterval = setInterval(() => {
            setTargets(prev => {
                // Double check to prevent 10+
                if (prev.length >= 10) return prev; 
                return [...prev, {
                    id: Date.now() + Math.random(),
                    x: Math.floor(Math.random() * 75) + 12,
                    y: Math.floor(Math.random() * 65) + 18,
                }];
            });
        }, spawnSpeed);

        return () => clearInterval(spawnInterval);
    }, [isGameOver, isPaused, spawnSpeed]);

    const handleHit = (id, x, y, e) => {
        if (isGameOver || isPaused) return;
        e.stopPropagation();
        
        setTargets(prev => prev.filter(t => t.id !== id));
        const newScore = score + 1;
        setScore(newScore);

        if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('shk_high_score', newScore);
        }

        // Juice Animation
        const newSticker = { id: Date.now(), x, y, number: newScore };
        setStickers(prev => [...prev, newSticker]);
        setTimeout(() => setStickers(prev => prev.filter(s => s.id !== newSticker.id)), 600);
    };

    const handleGameOver = () => {
        setIsGameOver(true);
        saveScoreToDB(highScore);
        
        Swal.fire({
            title: '<span style="color:#ff0055; font-family:serif; font-weight:900;">SYSTEM OVERLOAD!</span>',
            html: `
                <div style="background:#000; border:1px solid #ff0055; padding:20px; border-radius:15px; color:#fff;">
                    <p style="margin:0; opacity:0.6;">Current Mission Score</p>
                    <h1 style="font-size:3rem; margin:10px 0; color:#ff0055; text-shadow:0 0 10px #ff0055;">${score}</h1>
                    <hr style="border:0.5px solid #333; margin:15px 0;"/>
                    <p style="margin:0; opacity:0.6;">Global High Score</p>
                    <h2 style="color:#00ffcc;">${highScore}</h2>
                </div>
            `,
            background: '#020617',
            confirmButtonText: 'Play Again',
            confirmButtonColor: '#ff0055',
            allowOutsideClick: false
        }).then((res) => res.isConfirmed && resetGame());
    };

    const resetGame = () => {
        setScore(0);
        setTargets([]);
        setSpawnSpeed(800);
        setIsGameOver(false);
        setIsPaused(false);
    };

    const saveScoreToDB = async (finalScore) => {
        if (!user?.email) return;
        try {
            await fetch('https://shk-game-backend.vercel.app/api/save-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playerName, email: user?.email, score: finalScore, photo: user?.photoURL }),
            });
        } catch (err) { console.error(err); }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 font-mono select-none overflow-hidden flex flex-col items-center">
            
            {/* Header: Cyber HUD */}
            <div className="w-full max-w-4xl flex justify-between items-center bg-black/40 border-b-2 border-[#00ffcc] p-6 backdrop-blur-xl mb-4 shadow-[0_0_20px_#00ffcc33]">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-[#ff0055] overflow-hidden shadow-[0_0_15px_#ff0055]">
                        <img src={user?.photoURL} alt="p" className='w-full h-full object-cover'/>
                    </div>
                    <div>
                        <p className="text-[10px] text-[#00ffcc] tracking-[0.3em] font-bold">CR_HUNTER_V2</p>
                        <h2 className="text-xl font-black italic">{playerName}</h2>
                    </div>
                </div>

                <div className="flex gap-8">
                    <div className="text-center">
                        <p className="text-[10px] opacity-50 uppercase">Session</p>
                        <p className="text-3xl font-black text-[#ff0055]">{score}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] opacity-50 uppercase">Best</p>
                        <p className="text-3xl font-black text-[#00ffcc]">{highScore}</p>
                    </div>
                </div>
            </div>

            {/* Game Stats & Pause */}
            <div className="w-full max-w-4xl grid grid-cols-4 gap-2 mb-4">
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-center">
                    <p className="text-[9px] opacity-50">THREAT</p>
                    <p className={`text-sm font-bold ${targets.length > 7 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{targets.length}/10</p>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-center">
                    <p className="text-[9px] opacity-50">SPD_LVL</p>
                    <p className="text-sm font-bold text-yellow-400">{(1000/spawnSpeed).toFixed(1)}x</p>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-center">
                    <p className="text-[9px] opacity-50">STATUS</p>
                    <p className="text-sm font-bold text-[#00ffcc]">{isPaused ? 'PAUSED' : 'ACTIVE'}</p>
                </div>
                <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className={`rounded-lg font-black text-[10px] ${isPaused ? 'bg-[#00ffcc] text-black' : 'bg-white/10'}`}
                >
                    {isPaused ? 'RESUME' : 'PAUSE'}
                </button>
            </div>

            {/* Combat Zone */}
            <div 
                className={`relative w-full h-[55vh] max-w-4xl bg-black rounded-[40px] border-2 border-slate-800 overflow-hidden shadow-[inset_0_0_50px_#000] transition-all duration-500 ${isPaused ? 'scale-95 grayscale' : 'scale-100'}`}
                style={{ backgroundImage: 'linear-gradient(rgba(0,255,204,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            >
                <AnimatePresence>
                    {!isPaused && targets.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 2, opacity: 0, filter: 'hue-rotate(90deg) blur(10px)' }}
                            onClick={(e) => handleHit(t.id, t.x, t.y, e)}
                            className="absolute z-40 p-2 cursor-pointer"
                            style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className="relative group">
                                <img src="https://i.ibb.co.com/qLP8rZNd/Whats-App-Image-2026-02-10-at-9-02-16-PM.jpg" className="w-18 h-18 md:w-24 md:h-24 rounded-full border-2 border-[#ff0055] shadow-[0_0_20px_#ff0055]" />
                                <div className="absolute -inset-2 rounded-full border border-[#00ffcc33] animate-ping" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Heavy Hit Animation */}
                <AnimatePresence>
                    {stickers.map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                            animate={{ scale: [2, 1.2], opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            className="absolute z-50 pointer-events-none flex flex-col items-center"
                            style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <img src="https://i.ibb.co.com/67F6PWHR/juta.png" className="w-18 h-18 drop-shadow-[0_0_30px_rgba(255,0,85,0.5)]" />
                            <motion.span 
                                initial={{ opacity: 1 }}
                                animate={{ y: -60, opacity: 0 }}
                                className="absolute text-[#00ffcc] font-black text-5xl italic"
                            >
                                +{s.number}
                            </motion.span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Information Panel */}
            <div className="w-full max-w-4xl mt-6 p-4 bg-slate-900/30 rounded-2xl border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-[#00ffcc] text-xs font-bold uppercase tracking-widest">Mission Intel</h3>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 bg-[#ff0055] rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-[#00ffcc] rounded-full animate-pulse"></span>
                    </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                    1. Screen-e target er shonkhya 10 cross korle system overload hobe (Game Over).<br/>
                    2. Shomoy jawar sathe sathe matha ashar speed barbe (Difficulty Scaling).<br/>
                    3. Target hit korle score ekti persistent high score-e convert hobe.
                </p>
                <div className="flex gap-4 mt-2">
                    <button onClick={resetGame} className="flex-1 py-3 bg-[#ff0055] text-black font-black text-xs rounded-xl hover:brightness-125 transition-all">RESTART ENGINE</button>
                    <button onClick={() => saveScoreToDB(highScore)} className="flex-1 py-3 bg-white/10 border border-white/20 text-white font-black text-xs rounded-xl hover:bg-white/20">Done</button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;