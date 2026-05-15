'use client';

import { useSyncExternalStore } from 'react';
import Dashboard from './Dashboard';
import LoginScreen from './LoginScreen';

function subscribeStorage(cb: () => void) {
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}

function getRole(): 'admin' | 'blog' | null {
  const adminKey = sessionStorage.getItem('admin_key');
  if (adminKey) return 'admin';
  const blogKey = sessionStorage.getItem('blog_key');
  if (blogKey) return 'blog';
  return null;
}

export default function AdminClient() {
  const role = useSyncExternalStore(
    subscribeStorage,
    () => getRole(),
    () => null,
  );

  function handleLogin() {
    window.dispatchEvent(new StorageEvent('storage'));
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_key');
    sessionStorage.removeItem('blog_key');
    window.dispatchEvent(new StorageEvent('storage'));
  }

  if (!role) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard role={role} onLogout={handleLogout} />;
}
