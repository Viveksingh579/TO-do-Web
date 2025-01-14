import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Dummy authentication logic - Replace this with real authentication logic
    if ((username === 'admin' && password === 'adminpass') || (username === 'user' && password === 'userpass')) {
      const role = username === 'admin' ? 'admin' : 'user';
      setUser({ username, role });
      console.log('Logged in as:', { username, role }); // Debug log
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out'); // Debug log
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
