import { BrowserRouter,Routes,Route } from "react-router-dom";
import FirstScreen from "./pages/FirstScreen";
import ResisterUser from "./pages/ResisterUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/resisteruser" element={<ResisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
