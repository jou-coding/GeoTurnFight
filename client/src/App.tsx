import { BrowserRouter,Routes,Route} from "react-router-dom";
import ResisterUser from "./pages/Auth/ResisterUser";
import LoginUser from "./pages/Auth/LoginUser";
import Room from "./pages/Room/Room";
import Match from "./pages/Room/Match";
import CountryBattleGame from "./pages/Room/CountryBattleGame";
import AppProvider from "./pages/AppProvider";


function App() {
  
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/resisteruser" element={<ResisterUser />} />
          <Route path="/room" element={<Room />} />
          <Route path="/match" element={<Match />} />
          <Route path="/CountryBattleGame" element={<CountryBattleGame />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
