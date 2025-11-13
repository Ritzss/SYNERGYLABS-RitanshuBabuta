import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider, useUsers } from './context/UserContext';
import Nav from './components/Nav';
import AppRoutes from './routes/AppRoutes';
import SkeletonCard from './components/SkeletonCard';
import Alert from './components/Alert';

function Main() {
  const { loading, alert, setAlert } = useUsers();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg,#071028,#072033)' }}>
      <Nav />
      <main className="flex-1 container mx-auto p-6">
        <Alert alert={alert} onClose={() => setAlert(null)} />

        {loading ? (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-white">Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : (
          <AppRoutes />
        )}
      </main>
      <footer className="border-t p-4 text-center text-sm text-white">Made with ❤️ — JSONPlaceholder demo</footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Main />
      </UserProvider>
    </Router>
  );
}