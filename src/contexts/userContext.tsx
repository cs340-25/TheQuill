// src/contexts/UserContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
  } from 'react';
  
  export type User = {
    id: string;
    email: string;
    name?: string;
    // Add any other fields you need
  };
  
  type UserContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  };
  
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
  
    // Load user from localStorage on initial mount
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    }, []);
  
    const login = (user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
      setUserState(user);
    };
  
    const logout = () => {
      localStorage.removeItem('user');
      setUserState(null);
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  // Hook for accessing the context
  export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };
  