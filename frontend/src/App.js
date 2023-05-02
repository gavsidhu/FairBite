import { Route, Routes } from "react-router-dom";
import Register from "./page/register";
import SignIn from "./page/sign-in";
import GettingStarted from "./page/getting-started";
import "./index.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        {/* Add more routes here */}
      </Routes>
    </div>
  );
}

export default App;
