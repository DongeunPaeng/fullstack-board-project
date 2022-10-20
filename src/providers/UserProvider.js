import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [working, setWorking] = useState(true);

  const requestAccessToken = () => {
    axios
      .get("/api/request-access-token")
      .then((res) => {
        setTimeout(() => {
          requestAccessToken();
        }, (res.data.expiresAt * 1000 - Date.now()) / 2);

        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      })
      .catch(console.log)
      .finally(() => {
        setWorking(false);
      });
  };

  useEffect(() => {
    requestAccessToken();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {working ? null : children}
    </UserContext.Provider>
  );
};

export default UserProvider;
