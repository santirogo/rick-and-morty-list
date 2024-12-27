import { useState, useEffect } from 'react';
import { useCharacterContext } from '../../context/CharactersContext';
import { STATUS_OPTIONS } from './constants';
import './CharacterFilters.css'

function CharacterFilters() {
    const {
        filters,
        updateFilter,
        clearFilters,
        error,
        characters,
    } = useCharacterContext();

    const [speciesOptions, setSpeciesOptions] = useState([]);

    useEffect(() => {
        const fetchSpecies = () => {
            const speciesSet = new Set(characters.map(character => character.species));
            setSpeciesOptions([...speciesSet]);
            updateFilter("species", "");
        };

        fetchSpecies();
    }, [characters]);

    return (
        <section className="filters">
            <select
                value={filters.status}
                disabled={error}
                onChange={(event) => updateFilter("status", event.target.value)}
            >
                <option value="">Filtrar por estado</option>
                { STATUS_OPTIONS.map((option, index) => <option key={`${option.value}-${index}`} value={option.value}>{option.message}</option>) }
            </select>

            <select
                value={filters.species}
                disabled={error}
                onChange={(event) => updateFilter("species", event.target.value)}
            >
                <option value="">Filtrar por especie</option>
                { speciesOptions.map((option) => <option key={option} value={option}>{option}</option>) }
            </select>
            
            <input
                type="text"
                placeholder="Buscar por nombre"
                value={filters.name}
                disabled={error}
                onChange={(event) => updateFilter("name", event.target.value)}
            />

            <button
                className="clear-filters"
                onClick={clearFilters}
            >
                Clear Filters
            </button>
        </section>
    );
}

export default CharacterFilters;