import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import TargetPage from "./Pages/TargetPage";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/skip" element={<TargetPage />} />
      </Routes>
    </div>
  );
}

export default App;
