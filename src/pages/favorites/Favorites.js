import { useFavoriteContext } from '../../context/FavoriteContext'; 
import CharacterCard from '../../components/character-card/CharacterCard';

import './Favorites.css';

function Favorites() {
    const { favorites, toggleFavorite } = useFavoriteContext();

    if (!favorites || favorites.length === 0) {
        return <p className="info-message">No tienes personajes favoritos.</p>;
    }

    return (
        <main className="favorite-list">
            <h2>Favoritos</h2>
            <div className="card-container">
                {favorites.map((character) => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                        isFavorite={favorites.some((fav) => fav.id === character.id)}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </main>
    );
}

export default Favorites;
