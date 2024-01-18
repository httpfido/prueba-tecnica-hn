import { useContext, createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setAccessTokenAndRefreshToken: (_accessToken) => {},
  getAccessToken: () => {},
  saveUser: (_userData) => {},
  getUser: () => ({}),
  signout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData) {
    console.log("saveUser", userData);
    setAccessTokenAndRefreshToken(userData.token);
    setUser(userData.formattedResult[0]);
    setIsAuthenticated(true);
  }

  function setAccessTokenAndRefreshToken(accessToken) {
    console.log("setAccessTokenAndRefreshToken", accessToken);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        setAccessTokenAndRefreshToken,
        saveUser,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
