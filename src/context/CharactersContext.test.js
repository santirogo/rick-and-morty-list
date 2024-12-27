import { render, screen, fireEvent } from '@testing-library/react';
import { CharactersProvider, useCharacterContext } from './CharactersContext';

jest.mock('../utils/api', () => ({
    fetchCharacters: jest.fn(),
}));

const MockComponent = () => {
    const {
        filteredCharacters,
        loading,
        error,
        handlePageChange,
        updateFilter,
    } = useCharacterContext();

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                {filteredCharacters.map((character) => (
                    <div key={character.id}>
                    <h1>{character.name}</h1>
                    <p>{character.status}</p>
                    <p>{character.species}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => handlePageChange('next')}>Next Page</button>
            <button onClick={() => handlePageChange('prev')}>Prev Page</button>
            <input
                type="text"
                placeholder="Filter by name"
                onChange={(e) => updateFilter('name', e.target.value)}
            />
        </div>
    );
};

describe('CharactersContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should display the character name', async () => {
        require('../utils/api').fetchCharacters.mockResolvedValue({
            results: [
                { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
            ],
            info: { pages: 1 },
        });

        render(
            <CharactersProvider>
                <MockComponent />
            </CharactersProvider>
        );

        await screen.findByText('Rick Sanchez');
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('Should show errors', async () => {
        require('../utils/api').fetchCharacters.mockRejectedValue(new Error('Failed to fetch data'));
    
        render(
            <CharactersProvider>
                <MockComponent />
            </CharactersProvider>
        );

        await screen.findByText('Failed to fetch data');
        expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });

    it('Should filter by name', async () => {
        require('../utils/api').fetchCharacters.mockResolvedValue({
            results: [
                { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
                { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' },
            ],
            info: { pages: 1 },
        });
    
        render(
            <CharactersProvider>
                <MockComponent />
            </CharactersProvider>
        );

        await screen.findByText('Rick Sanchez');
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText(/filter by name/i), {
            target: { value: 'Morty' },
        });
        expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    it('Should change the page', async () => {
        require('../utils/api').fetchCharacters.mockResolvedValue({
            results: [
                { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
            ],
            info: { pages: 2 },
        });
    
        render(
            <CharactersProvider>
                <MockComponent />
            </CharactersProvider>
        );

        await screen.findByText('Rick Sanchez');
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

        fireEvent.click(screen.getByText(/next page/i));
        expect(require('../utils/api').fetchCharacters).toHaveBeenCalledWith(2);
        fireEvent.click(screen.getByText(/prev page/i));
        expect(require('../utils/api').fetchCharacters).toHaveBeenCalledWith(1);
    });
});