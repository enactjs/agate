import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Picker, PickerBase} from '../Picker';

describe('Picker Specs', () => {
	test('should render selected child wrapped with <PickerItem/>', () => {
		render(<Picker value={1}>{[1, 2, 3, 4]}</Picker>);
		const pickerValue = screen.getByRole('spinbutton');

		const expected = '2';

		expect(pickerValue).toHaveTextContent(expected);
	});

	test('should set the max of <Picker> to be one less than the number of children', () => {
		render(<Picker value={3}>{[1, 2, 3, 4]}</Picker>);
		const pickerValue = screen.getByLabelText('4 next item');

		const expectedAttribute = 'disabled';

		expect(pickerValue).toHaveAttribute(expectedAttribute);
	});

	test('should be disabled when empty', () => {
		render(<PickerBase>{[]}</PickerBase>);
		const pickerPreviousValue = screen.getByLabelText('undefined previous item');
		const pickerNextValue = screen.getByLabelText('undefined next item');

		const expectedAttribute = 'disabled';

		expect(pickerPreviousValue).toHaveAttribute(expectedAttribute);
		expect(pickerNextValue).toHaveAttribute(expectedAttribute);
	});
});
