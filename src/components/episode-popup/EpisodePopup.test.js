import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EpisodePopup from './EpisodePopup';

global.fetch = jest.fn();

describe('EpisodePopup', () => {
    const mockEpisodes = [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
    ];

    const mockClose = jest.fn();

    beforeEach(() => {
        const mockData = [
            { id: 1, name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013' },
            { id: 2, name: 'Lawn Mower Dog', episode: 'S01E02', air_date: 'December 9, 2013' },
        ];

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockData[0]),
        }).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockData[1]),
        });
    });

    it('renders episode details correctly', async () => {
        
    
        render(<EpisodePopup episodes={mockEpisodes} onClose={mockClose} />);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

        expect(await screen.findByText('Pilot')).toBeInTheDocument();
        expect(await screen.findByText('S01E01')).toBeInTheDocument();
        expect(await screen.findByText('Lawn Mower Dog')).toBeInTheDocument();
        expect(await screen.findByText('S01E02')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        render(<EpisodePopup episodes={mockEpisodes} onClose={mockClose} />);

        fireEvent.click(screen.getByText('X'));
        expect(mockClose).toHaveBeenCalledTimes(1);
    });
});