import React from 'react';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
