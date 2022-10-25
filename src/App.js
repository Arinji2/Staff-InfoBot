import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import MenuSelector from "./pages/menuSelector";
import ProgramCreator from "./pages/programs/creator";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<MenuSelector />}></Route>
          <Route path="/CreateProgram" element={<ProgramCreator />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
