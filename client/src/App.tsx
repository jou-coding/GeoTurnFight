import { BrowserRouter,Routes,Route } from "react-router-dom";
import FirstScreen from "./pages/FirstScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
