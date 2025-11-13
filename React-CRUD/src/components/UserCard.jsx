import React from 'react';

export default function UserCard({ user, onView, onEdit, onDelete, deleting }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">{user.name}</h3>
        <p className="text-sm text-slate-500">{user.email}</p>
        <p className="text-sm text-slate-500">{user.phone}</p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button onClick={() => onView(user.id)} className="px-3 py-1 bg-[#0b2545] text-white rounded">View</button>
        <button onClick={() => onEdit(user.id)} className="px-3 py-1 bg-[#0b2545]/80 text-white rounded">Edit</button>
        <button onClick={() => onDelete(user.id)} disabled={deleting} className={`px-3 py-1 rounded text-white ${deleting ? 'bg-red-300' : 'bg-red-600'}`}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}