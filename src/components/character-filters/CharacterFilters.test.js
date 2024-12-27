import { render, screen, fireEvent } from '@testing-library/react';

import { CharactersProvider } from '../../context/CharactersContext';
import { STATUS_OPTIONS, SPECIES_OPTIONS } from './constants';
import CharacterFilters from './CharacterFilters';

describe('CharacterFilters', () => {
    const renderWithContext = (ui) => render(<CharactersProvider>{ui}</CharactersProvider>);

    it('should render the filter options', () => {
        renderWithContext(<CharacterFilters />);

        expect(screen.getByText('Filtrar por estado')).toBeInTheDocument();
        STATUS_OPTIONS.forEach(option => {
            expect(screen.getByText(option.message)).toBeInTheDocument();
        });
    
        expect(screen.getByText('Filtrar por especie')).toBeInTheDocument();
        SPECIES_OPTIONS.forEach(option => {
            expect(screen.getByText(option.message)).toBeInTheDocument();
        });
    
        expect(screen.getByPlaceholderText('Buscar por nombre')).toBeInTheDocument();
    });

    it('should call updateFilter when a select value is changed', () => {
        renderWithContext(<CharacterFilters />);

        const selectStatus = screen.getByText('Filtrar por estado');
        fireEvent.change(selectStatus, { target: { value: 'alive' } });
        expect(screen.getByText('Filtrar por estado').value).toBe('alive');

        const selectSpecies = screen.getByText('Filtrar por especie');
        fireEvent.change(selectSpecies, { target: { value: 'Human' } });
        expect(screen.getByText('Filtrar por especie').value).toBe('Human');

        const searchInput = screen.getByPlaceholderText('Buscar por nombre');
        fireEvent.change(searchInput, { target: { value: 'Rick' } });
        expect(screen.getByPlaceholderText('Buscar por nombre').value).toBe('Rick');
    });

    it('should call clearFilters when the clear button is clicked', () => {
        renderWithContext(<CharacterFilters />);

        const clearButton = screen.getByText('Clear Filters');
        fireEvent.click(clearButton);
    });
});