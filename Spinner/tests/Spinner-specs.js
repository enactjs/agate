import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Spinner from '../Spinner';


describe('Spinner Specs', () => {
	test('should have transparentBackground class when transparent prop equals true', () => {
		render(<Spinner transparent />);

		const expected = 'transparentBackground';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should center the Spinner when centered prop equals true', () => {
		render(<Spinner centered />);

		const expected = 'centered';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should have pausedAnimation class when paused prop equals true', () => {
		render(<Spinner paused />);

		const expected = 'pausedAnimation';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should have loading class when type prop equals `loading`', () => {
		render(<Spinner type="loading" />);

		const expected = 'loading';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should have smallest class when size prop equals `smallest`', () => {
		render(<Spinner size="smallest" />);

		const expected = 'smallest';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should have small class when size prop equals `small`', () => {
		render(<Spinner size="small" />);

		const expected = 'small';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should have large class by default', () => {
		render(<Spinner />);

		const expected = 'large';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should have huge class when size prop equals `huge`', () => {
		render(<Spinner size="huge" />);

		const expected = 'huge';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should have dark class when color prop equals `dark`', () => {
		render(<Spinner color="dark" />);

		const expected = 'dark';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});

	test('should set role to alert by default', () => {
		render(<Spinner />);

		const actual = screen.getByRole('alert');

		expect(actual).toBeInTheDocument();
	});

	test('should set aria-live to off by default', () => {
		render(<Spinner />);

		const expected = 'off';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveAttribute('aria-live', expected);
	});

	test('should not have client node when Spinner has no children', () => {
		render(<Spinner />);

		const expected = 1;
		const expectedClass = 'client';
		const actual = screen.getByRole('alert').children;

		expect(actual).toHaveLength(expected);
		expect(actual[0]).not.toHaveClass(expectedClass);
	});

	test('should have a client node when Spinner has children', () => {
		render(<Spinner>Loading...</Spinner>);

		const expected = 2;
		const expectedClass = 'client';
		const actual = screen.getByRole('alert').children;

		expect(actual).toHaveLength(expected);
		expect(actual[1]).toHaveClass(expectedClass);
	});

	test('should have content class when Spinner has children', () => {
		render(<Spinner>Loading...</Spinner>);

		const expected = 'content';
		const actual = screen.getByRole('alert');

		expect(actual).toHaveClass(expected);
	});
});
