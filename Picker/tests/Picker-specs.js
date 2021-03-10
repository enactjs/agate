import {mount} from 'enzyme';

import {Picker, PickerBase} from '../Picker';

describe('Picker Specs', () => {
	test('should render selected child wrapped with <DrumPickerItem/>', () => {
		const picker = mount(
			<Picker value={1}>
				{[1, 2, 3, 4]}
			</Picker>
		);

		const expected = '2';
		const actual = picker.find('PickerItem').at(1).text();

		expect(actual).toBe(expected);
	});

	test('should set the max of <Picker> to be one less than the number of children',
		() => {
			const picker = mount(
				<Picker value={1}>
					{[1, 2, 3, 4]}
				</Picker>
			);

			const expected = 3;
			const actual = picker.find('Picker').last().prop('max');

			expect(actual).toBe(expected);
		}
	);

	test('should be disabled when empty', () => {
		const picker = mount(
			<PickerBase>
				{[]}
			</PickerBase>
		);

		const actual = picker.find('Picker').last().prop('disabled');

		expect(actual).toBe(true);
	});
});
