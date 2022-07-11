/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
	it('renders the navbar', () => {
		const { getByTestId } = render(<Navbar />);

		// expect(container.querySelector('[data-testid = "navlogo"]'));
		// expect(screen.getByTestId('navlogo'));
		// expect(screen.getByTestId('navlinks').toBeInTheDocument());
		expect(getByTestId('[data-testId="nav-cart-button"]'));
	});
});
