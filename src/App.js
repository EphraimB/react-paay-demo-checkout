import './App.css';
import { Routes, Route } from "react-router-dom"
import AppBar from './components/AppBar/AppBar';
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
