import React from 'react';
import logo from '../msg-logo.png';

function Header() {
  return (
    <header className="sticky top-0 bg-blue-500 text-white p-4 shadow-md flex items-center justify-between z-10"> {/* Added z-index */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-15 w-40 mr-4 bg-white m-1 p-2" />
      </div>
      <h1 className="text-2xl font-bold text-center flex-grow">AI Sales Assistance</h1>
      <div className="font-semibold text-lg text-yellow-300 italic">
        BTS for Automotive - India
      </div>
    </header>
  );
}

export default Header;