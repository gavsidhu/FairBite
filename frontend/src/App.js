import { Route, Routes } from "react-router-dom";
import Register from "./page/register";
import SignIn from "./page/sign-in";
import GettingStarted from "./page/getting-started";
import "./index.css"
import Session from "./page/session";
import { AuthProvider } from "./hooks/useAuth";
import Preferences from "./page/preferences";
import Home from "./page/home"
import { SessionProvider } from "./hooks/useSession";
import Results from "./page/results";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SessionProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/session/:id" element={<Session />} />
        <Route path="/" element={<Home />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/results/:id" element={<Results />} />
        {/* Add more routes here */}
      </Routes>
      </SessionProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
