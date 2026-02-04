import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import { AuthContext } from '../components/context/AuthContext';
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPass = import.meta.env.VITE_ADMIN_PASS;
    const hasAdminAccess = localStorage.getItem('shk_admin_access') === 'true';

    useEffect(() => {
        const isAdmin = (user?.email === adminEmail) || hasAdminAccess;

        if (isAdmin) {
            fetch('https://shk-game-backend.vercel.app/all-scores')
                .then(res => {
                    if (!res.ok) throw new Error("Server Error");
                    return res.json();
                })
                .then(data => {
                    setPlayers(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Fetch Error:", err);
                    setLoading(false);
                });
        } else {
            navigate('/admin-login');
        }
    }, [user, adminEmail, hasAdminAccess, navigate]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete this player?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                const reqEmail = user?.email || adminEmail;
                fetch(`https://shk-game-backend.vercel.app/score/${id}?email=${reqEmail}&pass=${adminPass}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        setPlayers(players.filter(p => p._id !== id));
                        Swal.fire('Deleted!', '', 'success');
                    }
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
                    <h1 className="text-2xl font-black flex items-center gap-2"><FaUserShield className="text-blue-600"/> Admin Dashboard</h1>
                    <button onClick={() => { localStorage.removeItem('shk_admin_access'); navigate('/'); }} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">Logout Admin</button>
                </div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800 text-white font-bold">
                            <tr>
                                <th className="p-4">Rank</th>
                                <th className="p-4">Player</th>
                                <th className="p-4 text-center">Score</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={player._id} className="border-b hover:bg-slate-50 transition">
                                    <td className="p-4 font-bold text-gray-400">#{index + 1}</td>
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={player.playerPhoto} className="w-10 h-10 rounded-full border" alt="p" />
                                        <span className="font-bold">{player.playerName}</span>
                                    </td>
                                    <td className="p-4 text-center font-black text-green-600">{player.playerScore}</td>
                                    <td className="p-4 text-center">
                                        <button onClick={() => handleDelete(player._id)} className="text-red-500 hover:text-red-700 transition-all"><FaTrashAlt/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <div className="p-10 text-center animate-pulse font-bold text-gray-400">Loading Data...</div>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;