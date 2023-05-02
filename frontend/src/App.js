import { Route, Routes } from "react-router-dom";
import Register from "./page/register";
import SignIn from "./page/sign-in";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* Add more routes here */}
      </Routes>
    </div>
  );
}

export default App;
