import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Hardcoded demo user - no backend needed!
const demoUser = {
  id: 1,
  name: "Aditya Bagla",
  username: "aditya_bagla",
  email: "aditya@campus.edu",
  profilePic: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600"
};

export const AuthContextProvider = ({ children }) => {
  // Always use demo user - no localStorage needed for demo
  const [currentUser, setCurrentUser] = useState(demoUser);

  const login = async (inputs) => {
    // Hardcoded login - always successful
    console.log("Demo login successful!");
    setCurrentUser(demoUser);
    return { data: demoUser };
  };

  const logout = async () => {
    // For demo, don't actually logout - just show message
    console.log("Demo logout");
    // Keep user logged in for demo purposes
    // setCurrentUser(null);
  };

  const updateUser = (userData) => {
    setCurrentUser(userData);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};