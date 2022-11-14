import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Image from '../Image';

const src = {
	hd: 'https://via.placeholder.com/200x200',
	fhd: 'https://via.placeholder.com/300x300',
	uhd: 'https://via.placeholder.com/600x600'
};

describe('Image', () => {
	test('should select a src', () => {
		render(<Image src={src} />);
		const image = screen.getAllByRole('img')[1];

		// dispatching resize event for code coverage purposes
		fireEvent(window, new Event('resize'));

		const actual = image.getAttribute('src');
		const expected = 'https://via.placeholder.com/300x300';

		expect(actual).toBe(expected);
	});
});
