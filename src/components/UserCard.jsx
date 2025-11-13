import React from 'react';

export default function UserCard({ user, onView, onEdit, onDelete, deleting }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md flex flex-col justify-between h-[60vh]">
      <div>
        <h3 className="text-2xl bg-[#0b2545] text-white text-center font-semibold">{user.name}</h3>
        <br />
        <p className="text-md text-black text-center ">Email: <br />{user.email}</p>
        <br />
        <p className="text-md text-black text-center ">Phone: <br />{user.phone}</p>
        <br />
        <p className="text-md text-black text-center ">Address: <br />{user.address.street},{user.address.suite},{user.address.city}</p>
        <br />
        <p className="text-md text-black text-center ">Company: <br />{user.company.name}</p>


      </div>

      <div className="mt-4 flex justify-around items-center gap-2">
        <button onClick={() => onView(user.id)} className="px-3 py-1 w-[33%]  bg-[#0b2545] text-white rounded">View</button>
        <button onClick={() => onEdit(user.id)} className="px-3 py-1 w-[33%]  bg-[#0b2545]/80 text-white rounded">Edit</button>
        <button onClick={() => onDelete(user.id)} disabled={deleting} className={`px-3 py-1 w-[33%]  rounded text-white ${deleting ? 'bg-red-300' : 'bg-red-600'}`}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}