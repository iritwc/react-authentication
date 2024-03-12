import { useState } from "react";

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("token");
  });

  const setToken = (newtoken) => {
    localStorage.setItem("token", newtoken);
    setTokenInternal(newtoken);
  };

  return [token, setToken];
};
