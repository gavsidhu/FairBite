  import { createContext, useContext, useEffect, useMemo, useState } from "react";
  import { useNavigate } from "react-router-dom";

  
  const SessionContext = createContext({

  });
  
  export const SessionProvider = ({ children }) => {
    const navigate = useNavigate();
    const [session, setSession] = useState()

    const joinSession = async () => {
        
    }

    const memoedValue = useMemo(
        () => ({
        }),
        []
      );
  
    return (
      <SessionProvider.Provider value={memoedValue}>
        {children}
      </SessionProvider.Provider>
    );
  };
  
  export default function useSession() {
      return useContext(SessionContext);
    }
  