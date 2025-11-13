import React, { createContext, useContext, useEffect, useState } from 'react';
import { USERS_URL } from '../api';

const UserContext = createContext();

export function useUsers() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(USERS_URL);
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setUsers(data);
      } catch (err) {
        setAlert({ message: err.message, type: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // Create
  async function createUser(payload) {
    const res = await fetch(USERS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Create failed: ${res.status}`);
    const created = await res.json();
    setUsers((p) => [{ ...created }, ...p]);
    setAlert({ message: 'User created (simulated)', type: 'success' });
    return created;
  }

  // Update
  async function updateUser(id, payload) {
    const res = await fetch(`${USERS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, id }),
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status}`);
    const updated = await res.json();
    setUsers((p) => p.map((u) => (u.id === Number(id) ? { ...u, ...updated } : u)));
    setAlert({ message: 'User updated (simulated)', type: 'success' });
    return updated;
  }

  // Delete (optimistic)
  async function deleteUser(id) {
    const idNum = Number(id);
    const snapshot = [...users];
    setUsers((p) => p.filter((u) => u.id !== idNum));
    try {
      const res = await fetch(`${USERS_URL}/${idNum}`, { method: 'DELETE' });
      if (!(res.status === 200 || res.status === 204)) throw new Error(`Delete failed: ${res.status}`);
      setAlert({ message: 'User deleted (simulated)', type: 'success' });
    } catch (err) {
      setUsers(snapshot);
      setAlert({ message: `Delete failed: ${err.message}`, type: 'error' });
      throw err;
    }
  }

  const value = { users, setUsers, loading, alert, setAlert, createUser, updateUser, deleteUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}