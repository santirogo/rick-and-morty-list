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
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/character/:id" element={<CharacterDetail/>} />
              <Route path="/favorites" element={<Favorites/>} />
              <Route path="*" element={<Home/>} />
            </Routes>
          </main>
      </CharactersProvider>
    </FavoriteProvider>
  );
}

export default App;
