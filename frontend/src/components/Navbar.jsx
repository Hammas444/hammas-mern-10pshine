import React from "react";
import { FaHome, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    window.location.href = "/";   
  }

const user = JSON.parse(localStorage.getItem('user'));



  return (

    (user? 
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                    flex items-center justify-center gap-6 
                    px-6 py-3 rounded-2xl 
                    bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
      
      {/* Home */}
      <Link to={'/dashboard'} className="text-black text-2xl hover:scale-110 transition">
        <FaHome />
        
      </Link>

      <Link to={'/profile'} className="text-black text-2xl hover:scale-110 transition">
        <FaUserCircle />
        
      </Link>

      {/* Logout */}

      <button onClick={handleLogout} className="text-black text-2xl hover:scale-110 transition">
        <FaSignOutAlt />
        
      </button>
    </nav>
    :"" )
   
  

  );
};

export default Navbar;
