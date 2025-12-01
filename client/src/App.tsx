import { BrowserRouter,Routes,Route} from "react-router-dom";
import ResisterUser from "./pages/Auth/ResisterUser";
import LoginUser from "./pages/Auth/LoginUser";
import Room from "./pages/Room/Room";
import Match from "./pages/Room/Match";
import ResultScreen from "./pages/Room/ResultScreen";
import Game from "./pages/Room/Game";
import AppProvider from "./pages/AppProvider";


function App() {
  
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/resisteruser" element={<ResisterUser />} />
          <Route path="/room" element={<Room />} />
          <Route path="/Match" element={<Match />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/resultscreen" element={<ResultScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
