import {mount} from 'enzyme';

import ColorPicker from '../ColorPicker';

const activate = (slider) => slider.simulate('keyup', {keyCode: 13});
const keyDown = (keyCode) => (slider) => slider.simulate('keydown', {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);

describe('ColorPicker', () => {
	test(
		'should change value when selecting a different color',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<ColorPicker
					onChange={handleChange}
					value="pink"
				>
					{['red', 'blue', 'yellow', 'pink']}
				</ColorPicker>
			);

			// first extend color picker
			subject.find('SwatchButton').simulate('click');
			// now click on blue color. it is the third SwatchButton in the component now
			subject.find('SwatchButton').at(2).simulate('click');

			const expected = 'blue';
			const actual = handleChange.mock.calls[0][0].value;
			expect(actual).toBe(expected);
		}
	);

	test(
		'should emit an onChange event when changing hue',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<ColorPicker
					onChange={handleChange}
					value="pink"
				>
					{['red', 'blue', 'yellow', 'pink']}
				</ColorPicker>
			);

			// first extend color picker
			subject.find('SwatchButton').simulate('click');
			// click on the "More" button
			subject.find('Button[aria-label=\'More\']').simulate('click');
			// focus slider and move it with right key
			activate(subject.find('Cell[aria-label=\'Hue\'] Slider'));
			rightKeyDown(subject.find('Cell[aria-label=\'Hue\'] Slider'));

			const expected = 1;
			const actual = handleChange.mock.calls.length;
			expect(actual).toBe(expected);
		}
	);

	test(
		'should emit an onChange event when changing saturation',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<ColorPicker
					onChange={handleChange}
					value="pink"
				>
					{['red', 'blue', 'yellow', 'pink']}
				</ColorPicker>
			);

			// first extend color picker
			subject.find('SwatchButton').simulate('click');
			// click on the "More" button
			subject.find('Button[aria-label=\'More\']').simulate('click');
			// focus slider and move it with left key
			activate(subject.find('Cell[aria-label=\'Saturation\'] Slider'));
			leftKeyDown(subject.find('Cell[aria-label=\'Saturation\'] Slider'));

			const expected = 1;
			const actual = handleChange.mock.calls.length;
			expect(actual).toBe(expected);
		}
	);

	test(
		'should emit an onChange event when changing lightness',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<ColorPicker
					onChange={handleChange}
					value="pink"
				>
					{['red', 'blue', 'yellow', 'pink']}
				</ColorPicker>
			);

			// first extend color picker
			subject.find('SwatchButton').simulate('click');
			// click on the "More" button
			subject.find('Button[aria-label=\'More\']').simulate('click');
			// focus slider and move it with right key
			activate(subject.find('Cell[aria-label=\'Lightness\'] Slider'));
			rightKeyDown(subject.find('Cell[aria-label=\'Lightness\'] Slider'));

			const expected = 1;
			const actual = handleChange.mock.calls.length;
			expect(actual).toBe(expected);
		}
	);

	test(
		'should not extend palette when disabled',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<ColorPicker
					disabled
					onChange={handleChange}
					value="pink"
				>
					{['red', 'blue', 'yellow', 'pink']}
				</ColorPicker>
			);

			// extend color picker
			subject.find('SwatchButton').simulate('click');
			// there is only one SwatchButton. It means the palette is not extended
			expect(subject.find('SwatchButton').length).toBe(1);
		}
	);
});
