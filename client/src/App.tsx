import { BrowserRouter,Routes,Route } from "react-router-dom";
import FirstScreen from "./pages/FirstScreen";
import ResisterUser from "./pages/ResisterUser";
import CreateRoom from "./pages/CreateRoom";
import LoginUser from "./pages/LoginUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/loginuser" element={<LoginUser />}></Route>
        <Route path="/resisteruser" element={<ResisterUser />} />
        <Route path="/createroom" element={<CreateRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
