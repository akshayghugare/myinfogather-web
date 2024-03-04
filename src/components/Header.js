// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from local storage or any other storage you use
        localStorage.clear();
        // Redirect to the login or home page
        navigate('/');
    };

    return (
        <header className="bg-blue-500 text-white flex justify-between items-center p-4">
            <div className="logo flex items-center">
                {/* <img src="/path-to-your-logo.png" alt="Logo" className="h-8 mr-2"/> */}
                <span className="font-bold text-xl transition duration-300 ease-in-out transform hover:-translate-y-1">Gather Information</span>
            </div>
            <div className="actions flex items-center">
                <button onClick={()=>{navigate("/myprofile")}} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:-translate-y-1">
                    My Profile
                </button>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
