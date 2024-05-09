import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContainer/MainContent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PokemonDetailsPage from "./pages/details/Details.jsx";
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Header/>}>
                  <Route  path="/pokemon" element={<MainContent/>}/>
              </Route>
              <Route path="/details/:name" element={<PokemonDetailsPage/>}/>
          </Routes>
      </BrowserRouter>

  )
}
export default App
