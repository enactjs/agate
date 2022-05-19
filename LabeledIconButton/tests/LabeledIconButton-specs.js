import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import LabeledIconButton from '../LabeledIconButton';

describe('LabeledIconButton Specs', () => {
	test('should render label when given children', () => {
		render(<LabeledIconButton icon="temperature">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'Hello LabeledIconButton';
		const actual = screen.getByText(expected);

		expect(actual).toHaveClass('label');
	});

	test('should not render children when no children is passed', () => {
		render(<LabeledIconButton icon="temperature" />);

		const expected = '';
		const actual = screen.getAllByRole('button')[0].children[1];

		expect(actual).toHaveTextContent(expected);
	});

	test('should render disabled LabeledIconButton', () => {
		render(<LabeledIconButton disabled icon="temperature">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'disabled';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expected);
	});

	test('should render highlighted LabeledIconButton', () => {
		render(<LabeledIconButton highlighted icon="temperature">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'highlighted';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveClass(expected);
	});

	test('should render selected LabeledIconButton', () => {
		render(<LabeledIconButton icon="temperature" selected>Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'selected';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render inline LabeledIconButton', () => {
		render(<LabeledIconButton icon="temperature" inline>Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'inline';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render smallest LabeledIconButton', () => {
		render(<LabeledIconButton icon="temperature" size="smallest">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'smallest';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render small LabeledIconButton', () => {
		render(<LabeledIconButton icon="temperature" size="small">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'small';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render large LabeledIconButton by default', () => {
		render(<LabeledIconButton icon="temperature">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'large';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render huge LabeledIconButton', () => {
		render(<LabeledIconButton icon="temperature" size="huge">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'huge';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render LabeledIconButton with label position left', () => {
		render(<LabeledIconButton icon="temperature" labelPosition="left">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'left';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render LabeledIconButton with label position right', () => {
		render(<LabeledIconButton icon="temperature" labelPosition="right">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'right';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render LabeledIconButton with label position above', () => {
		render(<LabeledIconButton icon="temperature" labelPosition="above">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'above';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should render LabeledIconButton with label position below', () => {
		render(<LabeledIconButton icon="temperature" labelPosition="below">Hello LabeledIconButton</LabeledIconButton>);

		const expected = 'below';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveClass(expected);
	});
});
