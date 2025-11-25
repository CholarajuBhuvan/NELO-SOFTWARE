import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';
import { checkMailNotifications } from './utils/mailAutomation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const session = sessionStorage.getItem('userSession');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Set up mail automation - check every 20 minutes (1200000 ms)
      const mailInterval = setInterval(() => {
        checkMailNotifications();
      }, 1200000); // 20 minutes

      // Also run once immediately after login
      checkMailNotifications();

      return () => clearInterval(mailInterval);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userSession');
    sessionStorage.removeItem('tasks');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TaskDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
