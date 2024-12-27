import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EpisodePopup from '../../components/episode-popup/EpisodePopup'

import './CharacterDetail.css';

const CharacterDetail = () => {
    const location = useLocation();
    const { character } = location.state || {};
    const [showEpisodes, setShowEpisodes] = useState(false);

    const togglePopup = () => setShowEpisodes(!showEpisodes);

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    if (!character) {
        return <p>Personaje no encontrado.</p>;
    }

    return (
        
        <main className="character-detail">
            <section className="character-info">
                <img src={character.image} alt={character.name} className="character-image" />
                <div className="character-info-details">
                    <h1 className="character-name">{character.name}</h1>
                    { Object.entries(character).map(([key, value]) => {
                        const excludedKeys = new Set(['name', 'image', 'episode']);
                        if (excludedKeys.has(key)) return null;

                        return <p className="character-data" key={key}><strong>{capitalizeFirstLetter(key)}:</strong> {value.name ?? (value || 'Unknown')}</p>
                    }) }
                </div>
                <button className="episodes-btn" onClick={togglePopup}>Ver Episodios</button>
            </section>

            {showEpisodes && (
                <EpisodePopup
                    episodes={character.episode}
                    onClose={togglePopup}
                />
            )}
        </main>
    );
};

export default CharacterDetail;