import {mount} from 'enzyme';
import ArcPicker from '../ArcPicker';

describe('ArcPicker Specs', () => {
	test(
		'should change value when clicking on a certain arc segment',
		() => {
			const handleChange = jest.fn();
			const arcPicker = mount(
				<ArcPicker onChange={handleChange}>{[1, 2, 3, 4]}</ArcPicker>
			);
			// find second Arc and click on the second <path> element inside of it
			arcPicker.find('Arc').at(1).find('path').at(1).simulate('click');

			const expected = 2;
			const actual = handleChange.mock.calls[0][0].value;
			expect(actual).toBe(expected);

			// find fourth Arc and click on the second <path> element inside of it
			arcPicker.find('Arc').at(3).find('path').at(1).simulate('click');

			const secondExpected = 4;
			const secondActual = handleChange.mock.calls[1][0].value;
			expect(secondActual).toBe(secondExpected);
		}
	);

	test(
		'should not run the onChange handler when disabled',
		() => {
			const handleChange = jest.fn();
			const arcPicker = mount(
				<ArcPicker disabled onChange={handleChange}>{[1, 2, 3, 4]}</ArcPicker>
			);

			// find second Arc and click on the second <path> element inside of it
			arcPicker.find('Arc').at(1).find('path').at(1).simulate('click');

			const expected = 0;
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		}
	);
});
