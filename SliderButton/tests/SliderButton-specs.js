import {mount} from 'enzyme';
import SliderButton from '../SliderButton';

const children = ['Light Speed', 'Ridiculous Speed', 'Ludicrous Speed'];

describe('SliderButton Specs', () => {
	test('should emit an onChange event when changing to value 1', () => {
		const handleChange = jest.fn();
		const evt = {value: 1};
		const sliderButton = mount(
			<SliderButton onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);
	});

	test('should set "aria-valueText" to text when value is changed to the 2nd item', () => {
		const handleChange = jest.fn();
		const evt = {value: 1};
		const sliderButton = mount(
			<SliderButton onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const valueText = sliderButton.find('SliderButton').prop('aria-valuetext');
		expect(valueText).toBe('Ridiculous Speed');
	});

	test('should set "aria-valueText" to text when value is changed to the 3rd item', () => {
		const handleChange = jest.fn();
		const evt = {value: 2};
		const sliderButton = mount(
			<SliderButton onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const valueText = sliderButton.find('SliderButton').prop('aria-valuetext');
		expect(valueText).toBe('Ludicrous Speed');
	});

	test('should set "aria-valueText" to text when value is changed to the 1st item', () => {
		const handleChange = jest.fn();
		const evt = {value: 0};
		const sliderButton = mount(
			<SliderButton onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const valueText = sliderButton.find('SliderButton').prop('aria-valuetext');
		expect(valueText).toBe('Light Speed');
	});

	test('should not emit onChange event when disabled', () => {
		const handleChange = jest.fn();
		const evt = {value: 1};
		const sliderButton = mount(
			<SliderButton disabled onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const expected = 0;
		const actual = handleChange.mock.calls.length;
		expect(actual).toBe(expected);
	});
});
