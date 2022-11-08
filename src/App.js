import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import products  from './features/db/products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
      </Routes>
    </div>
  );
}

export default App;
