import React from 'react';
import { useParams } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

export default function UserDetail() {
  const { id } = useParams();
  const { users } = useUsers();
  const user = users.find((u) => String(u.id) === String(id));
  if (!user) return <div className="p-4 text-white">User not found.</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">{user.name}</h2>
        <div className="space-y-2 text-slate-600">
          <div><strong className="text-slate-700">Email:</strong> {user.email}</div>
          <div><strong className="text-slate-700">Phone:</strong> {user.phone}</div>
          <div><strong className="text-slate-700">Website:</strong> {user.website}</div>
          <div><strong className="text-slate-700">Company:</strong> {user.company?.name}</div>
          <div><strong className="text-slate-700">Address:</strong> {user.address && `${user.address.suite}, ${user.address.street}, ${user.address.city}`}</div>
        </div>
      </div>
    </div>
  );
}