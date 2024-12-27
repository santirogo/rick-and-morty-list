import { useCharacterContext } from '../../context/CharactersContext';
import { STATUS_OPTIONS, SPECIES_OPTIONS } from './constants';
import './CharacterFilters.css'

function CharacterFilters() {
    const {
        filters,
        updateFilter,
        clearFilters,
        error,
    } = useCharacterContext();

    return (
        <section className="filters">
            <select
                value={filters.status}
                disabled={error}
                onChange={(event) => updateFilter("status", event.target.value)}
            >
                <option value="">Filtrar por estado</option>
                { STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.message}</option>) }
            </select>

            <select
                value={filters.species}
                disabled={error}
                onChange={(event) => updateFilter("species", event.target.value)}
            >
                <option value="">Filtrar por especie</option>
                { SPECIES_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.message}</option>) }
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