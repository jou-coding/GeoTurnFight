import { BrowserRouter,Routes,Route} from "react-router-dom";
import ResisterUser from "./pages/Auth/ResisterUser";
import LoginUser from "./pages/Auth/LoginUser";
import Room from "./pages/Room/Room";
import Match from "./pages/Room/Match";
import ResultScreen from "./pages/ResultScreen";
import Provider from "./components/Provider"
import { io } from "socket.io-client";
import Game from "./pages/Room/Game";

// autoConnect true でOK
export const socket = io("http://localhost:3000", {
  autoConnect: true,transports:["websocket","polling"]
});


function App() {
  
  return (
    <Provider >
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
    </Provider>
  );
}

export default App;
