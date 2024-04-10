import logo from "./logo.svg";
import "./App.css";
import Appbar from "./components/appbar.tsx";
import Home from "./components/home.jsx";

function App() {
  return (
    <div className="App">
      <Appbar />
      <Home />
    </div>
  );
}

export default App;
