import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const getFavoritesFromStorage = () => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    const [favorites, setFavorites] = useState(getFavoritesFromStorage());

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (character) => {
        setFavorites((prevFavorites) =>
            prevFavorites.some((fav) => fav.id === character.id)
                ? prevFavorites.filter((favoriteId) => favoriteId.id !== character.id)
                : [...prevFavorites, character]
        );
    };

    return (
        <FavoriteContext.Provider value={{
            favorites,
            toggleFavorite,
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavoriteContext = () => useContext(FavoriteContext);
