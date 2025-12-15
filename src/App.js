import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Design from "./pages/Design";
import Photobook from "./pages/Photobook";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/photobook" element={<Photobook />} />
        <Route path="/design" element={<Design />} />
      </Routes>
    </Router>
  );
}
