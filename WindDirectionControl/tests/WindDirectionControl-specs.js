import {mount} from 'enzyme';
import WindDirectionControl from '../WindDirectionControl';

describe('WindDirectionControl Specs', () => {
	test('should change value when clicking on the second arc segment', () => {
		const handleChange = jest.fn();
		const windDirectionControl = mount(
			<WindDirectionControl onChange={handleChange} />
		);
		// find second Arc and click on it
		windDirectionControl.find('Arc').at(1).find('path').at(1).simulate('click');

		const expected = 'airRight';
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);
	});

	test('should change value when clicking on the third arc segment', () => {
		const handleChange = jest.fn();
		const windDirectionControl = mount(
			<WindDirectionControl onChange={handleChange} />
		);
		// find third Arc and click on it
		windDirectionControl.find('Arc').at(2).find('path').at(1).simulate('click');

		const expected = 'airUp';
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);
	});

	test('should change value when clicking on the first arc segment', () => {
		const handleChange = jest.fn();
		// initiate WindDirectionControl with second arc selected
		const windDirectionControl = mount(
			<WindDirectionControl value="airRight" onChange={handleChange} />
		);
		// find first Arc and click on it
		windDirectionControl.find('Arc').at(0).find('path').at(1).simulate('click');

		const expected = 'airDown';
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);
	});

	test('should not call onChange handler when disabled', () => {
		const handleChange = jest.fn();
		const windDirectionControl = mount(
			<WindDirectionControl disabled onChange={handleChange} />
		);
		// find second Arc and click on the third <path> element inside of it
		windDirectionControl.find('Arc').at(1).find('path').at(1).simulate('click');

		const expected = 0;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});
});
