  import { createContext, useContext, useEffect, useMemo, useState } from "react";
  import { useNavigate } from "react-router-dom";

  
  const SessionContext = createContext({

  });
  
  export const SessionProvider = ({ children }) => {
    const navigate = useNavigate();
    const [session, setSession] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])

    const memoedValue = useMemo(
        () => ({
          selectedUsers,
          setSelectedUsers
        }),
        [selectedUsers]
      );
  
    return (
      <SessionContext.Provider value={memoedValue}>
        {children}
      </SessionContext.Provider>
    );
  };
  
  export default function useSession() {
      return useContext(SessionContext);
    }
  