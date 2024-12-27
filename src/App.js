import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import CharacterDetail from './pages/character-detail/CharacterDetail';
import Favorites from './pages/favorites/Favorites';
import Navbar from './components/navbar/Navbar';
import { FavoriteProvider } from './context/FavoriteContext';
import { CharactersProvider } from './context/CharactersContext';
import './App.css';

function App() {
  return (
    <FavoriteProvider>
      <CharactersProvider>
        <Router>
          <Navbar />

          <main>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/character/:id" element={<CharacterDetail/>} />
              <Route exact path="/favorites" element={<Favorites/>} />
              <Route path="*" element={<Home/>} />
            </Routes>
          </main>
        </Router>
      </CharactersProvider>
    </FavoriteProvider>
  );
}

export default App;
