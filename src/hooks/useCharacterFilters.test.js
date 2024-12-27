import { renderHook, act } from '@testing-library/react';
import useCharacterFilters from './useCharacterFilters';

describe("useFetch", () => {
    it("should render the hook with the initial state", async () => {
        const { result } = renderHook(() => useCharacterFilters());
        
        expect(result.current.filters.status).toBe('');
        expect(result.current.filters.species).toBe('');
        expect(result.current.filters.name).toBe('');
    });
    it('Should update status state', () => {
        const { result } = renderHook(() => useCharacterFilters());
        act(() => {
            result.current.updateFilter('status', 'alive');
        });
        
        expect(result.current.filters.status).toBe('alive');
    });
    
    it('Should reset the filters to initial state', () => {
        const { result } = renderHook(() => useCharacterFilters());
        act(() => {
            result.current.updateFilter('status', 'dead');
            result.current.updateFilter('species', 'Human');
            result.current.updateFilter('name', 'Rick');
        });
    
        expect(result.current.filters.status).toBe('dead');
        expect(result.current.filters.species).toBe('Human');
        expect(result.current.filters.name).toBe('Rick');

        act(() => {
            result.current.clearFilters();
        });

        expect(result.current.filters.status).toBe('');
        expect(result.current.filters.species).toBe('');
        expect(result.current.filters.name).toBe('');
    });
});