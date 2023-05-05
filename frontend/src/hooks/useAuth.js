import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const AuthContext = createContext({
  user: null,
  registerWithEmail: async () => {
    //Register user
  },
  signInWithEmail: async () => {
    //Sign in user
  },
  logout: async () => {
    //logout user
  },
  signInWithGoogle: async () => {
    //sign in with google popup
  },
  error: null,
  loading: false,
  initialLoading: true,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          
        }

        setInitialLoading(false);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
  );

  const registerWithEmail = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
          method: "POST",
          body: JSON.stringify({
            firebaseId: userCredential.user.uid,
            email: userCredential.user.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(userCredential.user);
        navigate("/preferences")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const signInWithEmail = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        if (
          result.user.metadata.creationTime ===
          result.user.metadata.lastSignInTime
        ) {
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
            method: "POST",
            body: JSON.stringify({
              firebaseId: result.user.uid,
              email: result.user.email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          setUser(result.user);
          navigate("/preferences")
          return
        }
        setUser(result.user);
        navigate("/")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(async () => {
        setUser(null);
        navigate("/sign-in")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      logout,
      registerWithEmail,
      signInWithEmail,
      signInWithGoogle,
      error,
      loading,
      initialLoading,
    }),
    [user, error, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
