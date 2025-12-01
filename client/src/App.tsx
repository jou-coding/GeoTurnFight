import { BrowserRouter,Routes,Route} from "react-router-dom";
import FirstScreen from "./pages/FirstScreen";
import ResisterUser from "./pages/Auth/ResisterUser";
import CreateRoom from "./pages/Room/CreateRoom";
import LoginUser from "./pages/Auth/LoginUser";
import Room from "./pages/Room/Room";
import SearchRoom from "./pages/Room/SearchRoom";
import Match from "./pages/Match";
import SendCountry from "./pages/SendCountry";
import ResultScreen from "./pages/ResultScreen";
import Provider from "./components/Provider"
import { io } from "socket.io-client";

// autoConnect true でOK
export const socket = io("http://localhost:3000", {
  autoConnect: true,transports:["websocket","polling"]
});


function App() {
  
  return (
    <Provider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstScreen />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/resisteruser" element={<ResisterUser />} />
          <Route path="/room" element={<Room />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/searchroom" element={<SearchRoom />} />
          <Route path="/Match" element={<Match />} />
          <Route path="/sendcountry" element={<SendCountry />} />
          <Route path="/resultscreen" element={<ResultScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
