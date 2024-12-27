import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCharacters } from '../utils/api'
import useCharacterFilters from '../hooks/useCharacterFilters';

const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [characters, setCharacters] = useState([]);
    const { filters, updateFilter, clearFilters } = useCharacterFilters();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchCharacters(currentPage);
                setCharacters(result.results);
                setTotalPages(result.info.pages);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        let filtered = characters;

        if (filters.status) {
            filtered = filtered.filter((character) => character.status.toLowerCase() === filters.status.toLowerCase());
        }

        if (filters.species) {
            filtered = filtered.filter((character) => character.species.toLowerCase() === filters.species.toLowerCase());
        }

        if (filters.name) {
            filtered = filtered.filter((character) => character.name.toLowerCase().includes(filters.name.toLowerCase()));
        }

        setFilteredCharacters(filtered);
    }, [characters, filters]);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <CharactersContext.Provider value={{
            filters,
            updateFilter,
            clearFilters,
            filteredCharacters,
            currentPage,
            handlePageChange,
            totalPages,
            error,
            loading,
        }}>
            {children}
        </CharactersContext.Provider>
    );
};

export const useCharacterContext = () => useContext(CharactersContext);
