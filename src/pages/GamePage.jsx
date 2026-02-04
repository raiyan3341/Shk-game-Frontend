import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { AuthContext } from '../components/context/AuthContext'; // Path check koro

const GamePage = () => {
    const { user } = useContext(AuthContext);
    
    // Auto-save logic: Page refresh korle ba nav change korle score thakbe
    const [score, setScore] = useState(() => {
        const savedScore = localStorage.getItem('shk_current_score');
        return savedScore ? parseInt(savedScore) : 0;
    });
    
    const [stickers, setStickers] = useState([]);
    const playerName = localStorage.getItem('shk_player_name') || user?.displayName || "Guest Player";

    // Score change holei localStorage e update hobe
    useEffect(() => {
        localStorage.setItem('shk_current_score', score);
        if (score > 0) {
            saveScoreToDB(score);
        }
    }, [score]);

    useEffect(() => {
    if (user?.email) {
        fetch(`https://shk-game-backend.vercel.app/all-scores`) // Shob score fetch koro
            .then(res => res.json())
            .then(data => {
                // Oi user-er score database-e thakle sheta set koro
                const currentPlayer = data.find(p => p.playerEmail === user.email);
                if (currentPlayer) {
                    setScore(currentPlayer.playerScore);
                    localStorage.setItem('shk_current_score', currentPlayer.playerScore);
                }
            });
    }
}, [user]);

    const handleTap = (e) => {
        const newScore = score + 1;
        setScore(newScore);

        // Random position logic: Sticker gulo image er upore bivinno jaygay jabe
        const x = Math.floor(Math.random() * 60) + 20; 
        const y = Math.floor(Math.random() * 60) + 20; 

        const newSticker = {
            id: Date.now(),
            x: x,
            y: y,
            number: newScore,
            rotate: Math.random() * 360 - 180 // Random rotation for realistic effect
        };

        setStickers((prev) => [...prev, newSticker]);

        // Sticker auto-remove
        setTimeout(() => {
            setStickers((prev) => prev.filter(s => s.id !== newSticker.id));
        }, 1000);
    };

    const saveScoreToDB = async (currentScore) => {
        const gameData = {
            name: playerName,
            email: user?.email,
            score: currentScore,
            photo: user?.photoURL
        };

        try {
            await fetch('https://shk-game-backend.vercel.app/api/save-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameData)
            });
        } catch (err) {
            console.error("Database sync error:", err);
        }
    };

    const handleDone = () => {
        saveScoreToDB(score);
        Swal.fire({
            title: 'সম্মান প্রদর্শন সফল!',
            text: `আপনি CR কে ${score} বার সম্মান জানিয়েছেন!`,
            imageUrl: 'https://i.ibb.co.com/6R32hW46/Whats-App-Image-2025-09-10-at-22-00-39-48a5347c.jpg',
            imageWidth: 300,
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Restart (Reset 0)',
            cancelButtonText: 'Done (Keep Score)'
        }).then((result) => {
            if (result.isConfirmed) {
                setScore(0);
                localStorage.setItem('shk_current_score', 0);
                saveScoreToDB(0);
                setStickers([]);
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#1a1a1e] text-white py-10 px-4 font-sans overflow-hidden">
            {/* Main Container with Glassmorphism Effect */}
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-[40px] shadow-2xl p-6 relative">
                
                {/* Score & Player Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="bg-blue-600/80 px-4 py-2 rounded-xl border border-blue-400">
                        <p className="text-xs uppercase opacity-70">Active Player</p>
                        <p className="font-bold">{playerName}</p>
                    </div>
                    <motion.div 
                        key={score}
                        initial={{ scale: 1.5, color: '#ef4444' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="bg-red-600 px-6 py-2 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                    >
                        <p className="text-3xl font-black">{score}</p>
                    </motion.div>
                </div>

                {/* Game Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent italic uppercase">
                        CR Respect Simulator
                    </h1>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-green-400">গেমটি খেলতে Photo উপর বা নিচে Tap to respect বাটনে ক্লিক করুন</h1>
                </div>

                {/* Image Play Area */}
                <div 
                    onClick={handleTap}
                    className="relative w-full aspect-square max-w-[500px] mx-auto bg-black rounded-3xl border-8 border-white/10 shadow-inner cursor-crosshair overflow-hidden group"
                >
                    <img 
                        src="https://i.ibb.co.com/84K6zC8g/Whats-App-Image-2025-09-10-at-22-00-39-b8ddfa7d.jpg" 
                        className="w-full h-full opacity-80 group-active:scale-95 transition-transform duration-75" 
                        alt="CR Target" 
                    />

                    {/* Dynamic Sticker Animation */}
                    <AnimatePresence>
                        {stickers.map((sticker) => (
                            <motion.div
                                key={sticker.id}
                                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                exit={{ y: -100, opacity: 0, scale: 2 }}
                                className="absolute z-50 pointer-events-none"
                                style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                            >
                                <div className="relative">
                                    <img src="https://i.ibb.co.com/67F6PWHR/juta.png" className="w-20 h-20 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" alt="juta" />
                                    <span className="absolute inset-0 flex items-center justify-center text-black font-black text-2xl drop-shadow-md">
                                        {sticker.number}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="mt-10 flex flex-col items-center gap-6">
                    <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgb(34, 197, 94)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTap}
                        className="bg-green-500 hover:bg-green-400 text-white w-full max-w-xs py-5 rounded-2xl text-2xl font-black uppercase tracking-widest shadow-lg border-b-4 border-green-700 transition-all"
                    >
                        Tap to Respect 👋
                    </motion.button>

                    <div className="flex gap-4">
                        <motion.button 
    whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 0px 25px rgba(236, 72, 153, 0.6)" // Pink/Red neon glow
    }}
    whileTap={{ scale: 0.95 }}
    onClick={handleDone}
    className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-red-600 text-white font-black uppercase tracking-widest text-sm shadow-[0_8px_0_rgb(157,23,77)] hover:shadow-[0_4px_0_rgb(157,23,77)] hover:translate-y-[4px] transition-all border-t border-white/30 overflow-hidden"
>
    {/* Animated Light Effect inside button */}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
    
    <span className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse"></span>
    
    <span className="relative z-10">Save Score</span>
    
    {/* Keyframe animation CSS (Add this to your index.css if not present) */}
    <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
    `}} />
</motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;