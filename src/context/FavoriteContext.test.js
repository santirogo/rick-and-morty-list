import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteProvider, useFavoriteContext } from './FavoriteContext';

const mockLocalStorage = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();
Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

const MockComponent = () => {
    const { favorites, toggleFavorite } = useFavoriteContext();

    const character = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
    };

    return (
        <div>
            <h1>Favoritos</h1>
            <button onClick={() => toggleFavorite(character)}>
                {favorites.some((fav) => fav.id === character.id)
                    ? 'Eliminar de favoritos'
                    : 'Agregar a favoritos'}
            </button>
            <div>
                {favorites.length > 0 ? (
                    favorites.map((fav) => <p key={fav.id}>{fav.name}</p>)
                ) : (
                    <p>No hay personajes favoritos</p>
                )}
            </div>
        </div>
    );
};

describe('FavoriteContext', () => {
    afterEach(() => {
        mockLocalStorage.clear();
    });

    it('Should load the favorites characters', () => {
        mockLocalStorage.setItem('favorites', JSON.stringify([{ id: 1, name: 'Rick Sanchez' }]));
    
        render(
            <FavoriteProvider>
                <MockComponent />
            </FavoriteProvider>
        );

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('Should add and delete a character from favorites', () => {
        render(
            <FavoriteProvider>
                <MockComponent />
            </FavoriteProvider>
        );
    
        const addButton = screen.getByText('Agregar a favoritos');
        fireEvent.click(addButton);

        expect(screen.getByText('Eliminar de favoritos')).toBeInTheDocument();
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(mockLocalStorage.getItem('favorites')).toContain('Rick Sanchez');

        const removeButton = screen.getByText('Eliminar de favoritos');
        fireEvent.click(removeButton);
        expect(mockLocalStorage.getItem('favorites')).toBe('[]');
    });
});
