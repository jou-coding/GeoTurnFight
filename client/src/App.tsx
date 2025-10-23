import { BrowserRouter,Routes,Route} from "react-router-dom";
import FirstScreen from "./pages/FirstScreen";
import ResisterUser from "./pages/Auth/ResisterUser";
import CreateRoom from "./pages/Room/CreateRoom";
import LoginUser from "./pages/Auth/LoginUser";
import Room from "./pages/Room/Room";
import SearchRoom from "./pages/Room/SearchRoom";
import Battle from "./pages/Battle";
import SendCountry from "./pages/SendCountry";
import ResultScreen from "./pages/ResultScreen";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/loginuser" element={<LoginUser />}></Route>
        <Route path="/resisteruser" element={<ResisterUser />} />
        <Route path="/room" element={<Room />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/searchroom" element={<SearchRoom />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/sendcountry" element={<SendCountry />} />
        <Route path="/resultscreen" element={<ResultScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
