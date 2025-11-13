import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="w-full p-4 bg-[linear-gradient(90deg,#0b2545,#08203a)] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">User Manager</Link>
        <div className="space-x-2">
          <Link to="/" className="px-3 py-1 rounded hover:bg-white/10">Home</Link>
          <Link to="/create" className="px-3 py-1 rounded bg-white text-[#08203a]">Create User</Link>
        </div>
      </div>
    </nav>
  );
}