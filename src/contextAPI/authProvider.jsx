import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const login = (userData) => {
    const existingUser = users.find(u => u.email === userData.email && u.password === userData.password);
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('user', JSON.stringify(existingUser));
      localStorage.setItem('loginTimestamp', Date.now().toString());
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (formData) => {
    if (users.some(u => u.email === formData.email)) {
      return { success: false, message: "User with this email already exists" };
    }
    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Auto login after registration
    setUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));
    localStorage.setItem('loginTimestamp', Date.now().toString());
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginTimestamp');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth Context is not available");
  }
  return context;
};