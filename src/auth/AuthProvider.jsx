import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: true,
});
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
