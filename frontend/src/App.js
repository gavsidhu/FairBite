import { Route, Routes } from "react-router-dom";
import Register from "./page/register";
import SignIn from "./page/sign-in";
import GettingStarted from "./page/getting-started";
import "./index.css"
import Session from "./page/session";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/session/:id" element={<Session />} />
        {/* Add more routes here */}
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
