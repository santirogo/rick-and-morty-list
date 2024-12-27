import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('should render the spinner component correctly', () => {
        render(<Spinner />);

        const spinnerElement = screen.getByRole('status');
        expect(spinnerElement).toBeInTheDocument();
    });
});