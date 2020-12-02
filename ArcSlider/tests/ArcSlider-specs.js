import React from 'react';
import {mount} from 'enzyme';
import ArcSlider from '../ArcSlider';

const tap = (node) => {
	node.simulate('mousedown');
	node.simulate('mouseup');
};

describe('ArcSlider Specs', () => {
	test(
		'should change value when clicking on a certain arc segment',
		() => {
			const handleChange = jest.fn();
			const arcSlider = mount(
				<ArcSlider
					onChange={handleChange}
					value={10}
				/>
			);

			tap(arcSlider);

			const expected = 2;
			const actual = handleChange.mock.calls[0][0].value;
			expect(actual).toBe(expected);
		}
	);

	test(
		'should not change value when disabled and clicking on a certain arc segment',
		() => {
			const handleChange = jest.fn();
			const arcSlider = mount(
				<ArcSlider
					disabled
					onChange={handleChange}
				/>
			);

			tap(arcSlider);

			const expected = 0;
			const actual = handleChange.mock.calls.length;
			expect(actual).toBe(expected);
		}
	);
});
