import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
	it('renders the footer', () => {
		render(<Footer />);
		// expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
		// expect(screen.getByTestId('navlinks')).toBeInTheDocument();
		// expect(screen.getByTestId('navicons')).toBeInTheDocument();
	});
});
