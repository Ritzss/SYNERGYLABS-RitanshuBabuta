import React from 'react';

export default function Alert({ alert, onClose }) {
  if (!alert) return null;
  const base = 'px-4 py-2 rounded mb-4 border flex justify-between items-center';
  const styles = {
    error: 'bg-red-50 border-red-400 text-red-700',
    success: 'bg-green-50 border-green-400 text-green-700',
    info: 'bg-white border-gray-200 text-gray-800',
  };
  return (
    <div className={`${base} ${styles[alert.type] || styles.info}`} role="alert">
      <div>{alert.message}</div>
      <button className="ml-4 font-bold" onClick={onClose} aria-label="close">×</button>
    </div>
  );
}