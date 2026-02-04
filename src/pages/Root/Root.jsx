import React, { useEffect } from 'react';
import { Outlet } from "react-router";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const Root = () => {
    useEffect(() => {
        // Right click block
        
        
        // Inspect tool shortcut block
        const handleKeyDown = (e) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || (e.ctrlKey && ['U', 'S'].includes(e.key))) {
                e.preventDefault();
            }
        };


        document.addEventListener('keydown', handleKeyDown);

        return () => {
            
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="font-roboto">
            <Navbar />
            <div className="min-h-[calc(100vh-200px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;