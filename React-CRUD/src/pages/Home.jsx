import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import UserCard from '../components/UserCard';

export default function Home() {
  const navigate = useNavigate();
  const { users, deleteUser, setAlert } = useUsers();
  const [deletingIds, setDeletingIds] = useState(new Set());

  const onView = (id) => navigate(`/users/${id}`);
  const onEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const idNum = Number(id);
    setDeletingIds((s) => new Set(s).add(idNum));
    try {
      await deleteUser(idNum);
    } catch (err) {
      // alert handled inside context
    } finally {
      setDeletingIds((s) => {
        const copy = new Set(s);
        copy.delete(idNum);
        return copy;
      });
    }
  };

  if (!users?.length) return <div className="p-4 text-white">No users.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <UserCard key={u.id} user={u} onView={onView} onEdit={onEdit} onDelete={handleDelete} deleting={deletingIds.has(u.id)} />
        ))}
      </div>
    </div>
  );
}