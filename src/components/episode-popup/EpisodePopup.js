import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import './EpisodePopup.css';

function EpisodePopup({ episodes, onClose }) {
    const [episodeDetails, setEpisodeDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEpisodeDetails = async () => {
            setLoading(true);
            const episodeDetails = await Promise.all(
                episodes.map(async (episodeUrl) => {
                    const response = await fetch(episodeUrl);
                    return response.json();
                })
            );
            setLoading(false);
            setEpisodeDetails(episodeDetails);
        };
        fetchEpisodeDetails();
    }, [episodes]);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-content">
                    <h2 className="modal-title">Detalles de los Episodios</h2>
                    { loading ? 
                        ( <Spinner /> ) :
                        (<ul>
                            {episodeDetails.map((episode) => (
                                <li key={episode.id}>
                                    <h4>{episode.name}</h4>
                                    <p><strong>Episodio:</strong> {episode.episode}</p>
                                    <p><strong>Fecha de emisión:</strong> {episode.air_date}</p>
                                </li>
                            ))}
                        </ul>)
                    }
                </div>
            </div>
        </div>
    );
}

export default EpisodePopup;