import { BrowserRouter,Routes,Route} from "react-router-dom";
import FirstScreen from "./pages/FirstScreen";
import ResisterUser from "./pages/ResisterUser";
import CreateRoom from "./pages/CreateRoom";
import LoginUser from "./pages/LoginUser";
import Room from "./pages/Room";
import SearchRoom from "./pages/SearchRoom";
import Battle from "./pages/Battle";
import SendCountry from "./pages/SendCountry";


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
