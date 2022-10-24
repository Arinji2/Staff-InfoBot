import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav";
import Home from "./pages/home";
import Creator from "./pages/programs/creator";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CreateProgram" element={<Creator />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
