import { Route, Routes } from "react-router-dom";
import Register from "./page/register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* Add more routes here */}
      </Routes>
    </div>
  );
}

export default App;
