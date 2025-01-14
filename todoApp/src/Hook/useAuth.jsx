import { useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const role = username === 'admin' ? 'admin' : 'user';
    setUser({ username, role });
    console.log('Logged in as:', { username, role }); // Debug log
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
