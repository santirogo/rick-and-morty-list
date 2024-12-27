import CharacterCard from '../../components/character-card/CharacterCard';
import CharacterFilters from '../../components/character-filters/CharacterFilters'
import Spinner from '../../components/spinner/Spinner';
import { useFavoriteContext } from '../../context/FavoriteContext';
import { useCharacterContext } from '../../context/CharactersContext';

import './Home.css';

const Home = () => {
    const {
        favorites,
        toggleFavorite,
    } = useFavoriteContext();
    const {
        filteredCharacters,
        totalPages,
        currentPage,
        handlePageChange,
        error,
        loading,
    } = useCharacterContext();

    return (
        <main className="character-list-container">
            <h1>Lista de Personajes</h1>
            { error && <div className="error-message">{error}</div> }

            <CharacterFilters />

            { loading ? 
                ( <Spinner /> ) : 
                (<section className="character-list">
                    {filteredCharacters.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            isFavorite={favorites.some((fav) => fav.id === character.id)}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </section>) 
            }

            <div className="pagination">
                <button
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </main>
    );
};

export default Home;