import { useEffect, useState, useCallback } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem("userData", JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  },[])

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      login(data.token, data.userId);
    }
    setIsReady(true);
  }, [login]);

  return {  login, logout, isReady, token, userId, };
};

