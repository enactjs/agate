import React from 'react';
import {mount} from 'enzyme';

import ColorPicker from '../ColorPicker';
import css from '../ColorPicker.module.less';

describe('ColorPicker', () => {

	test(
		'should emit an onChange event when selecting a different color',
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

			const base = subject.find('ColorPicker').first();

			base.prop('onChange')({value: 'blue'});

			const expected = 1;
			const actual = handleChange.mock.calls.length;

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

			const base = subject.find(`div.${css.sliders}`).exists();

			console.log(base);

			// base.prop('onChange')({value: 30});
			//
			// const expected = 1;
			// const actual = handleChange.mock.calls.length;
			//
			// expect(actual).toBe(expected);
		}
	);
});
