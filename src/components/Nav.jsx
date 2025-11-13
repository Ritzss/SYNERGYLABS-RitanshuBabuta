import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="w-full p-4 bg-[linear-gradient(90deg,#0b2545,#08203a)] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <img className='w-[5%] rounded-[100%] h-[5%]' src="..\src\Assets\images\logo.jpg" alt="" />
        <Link to="/" className="xl:text-5xl .textsize sm:text-3xl font-semibold">User Manager</Link>
        <div className="space-x-2">
          <Link to="/" className="px-3 py-1 rounded hover:bg-white/10">Home</Link>
          <Link to="/create" className="px-3 py-1 rounded bg-white text-[#08203a]">Create User</Link>
        </div>
      </div>
    </nav>
  );
}