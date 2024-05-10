import {BrowserRouter, Route, Routes} from "react-router-dom";
import PokemonDetailsPage from "./pages/details/Details.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/details/:name" element={<PokemonDetailsPage/>}/>
          </Routes>
      </BrowserRouter>

  )
}
export default App
