import { Link } from 'react-router-dom';
import './CharacterCard.css';

const CharacterCard = ({ character, isFavorite, toggleFavorite }) => {
    return (
        <article className="card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p><strong>Estado:</strong> {character.status}</p>
            <p><strong>Especie:</strong> {character.species}</p>
            <div className="card-buttons">
                <button onClick={() => toggleFavorite(character)} className={isFavorite ? 'favorite active' : 'favorite'}>
                    {isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                </button>
                <Link to={`/character/${character.id}`} state={{ character }} className="card-details">Ver detalles</Link>
            </div>
        </article>
    );
};

export default CharacterCard;