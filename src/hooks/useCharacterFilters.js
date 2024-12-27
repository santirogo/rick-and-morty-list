import { useState } from "react";

const useCharacterFilters = () => {
    const [filters, setFilters] = useState({
        status: "",
        species: "",
        name: "",
    });

    const updateFilter = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const clearFilters = () => {
        setFilters({
            status: "",
            species: "",
            name: "",
        });
    };

    return {
        filters,
        updateFilter,
        clearFilters,
    };
};

export default useCharacterFilters;