'use client';

import { useState } from 'react';
import Dashboard from './Dashboard';
import LoginScreen from './LoginScreen';

export default function AdminClient() {
  const [adminKey, setAdminKey] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem('admin_key') : null
  );

  function handleLogout() {
    sessionStorage.removeItem('admin_key');
    setAdminKey(null);
  }

  if (!adminKey) return <LoginScreen onLogin={setAdminKey} />;
  return <Dashboard adminKey={adminKey} onLogout={handleLogout} />;
}
