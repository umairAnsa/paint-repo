'use client';

import { useSyncExternalStore } from 'react';
import Dashboard from './Dashboard';
import LoginScreen from './LoginScreen';

function subscribeStorage(cb: () => void) {
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}

export default function AdminClient() {
  const adminKey = useSyncExternalStore(
    subscribeStorage,
    () => sessionStorage.getItem('admin_key'),
    () => null
  );

  function handleLogin() {
    window.dispatchEvent(new StorageEvent('storage'));
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_key');
    window.dispatchEvent(new StorageEvent('storage'));
  }

  if (!adminKey) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard adminKey={adminKey} onLogout={handleLogout} />;
}
