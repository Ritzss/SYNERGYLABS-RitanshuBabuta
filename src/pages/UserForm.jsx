import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const { users, createUser, updateUser, setAlert } = useUsers();

  const defaultUser = editing ? users.find((u) => String(u.id) === String(id)) : { name: '', email: '', phone: '' };

  const [form, setForm] = useState({ name: defaultUser?.name || '', email: defaultUser?.email || '', phone: defaultUser?.phone || '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing && defaultUser) setForm({ name: defaultUser.name, email: defaultUser.email, phone: defaultUser.phone });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultUser]);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateUser(id, form);
      } else {
        await createUser(form);
      }
      navigate('/');
    } catch (err) {
      // Context already sets alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">{editing ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-slate-600">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block mb-1 text-slate-600">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block mb-1 text-slate-600">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          </div>

          <div className="flex items-center space-x-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#0b2545] text-white rounded-lg">{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}