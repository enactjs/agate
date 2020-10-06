import React from 'react';
import {mount} from 'enzyme';

import ThumbnailItem from '../ThumbnailItem';

describe('ThumbnailItem Specs', () => {
	test('should render a label when `label` prop is set', () => {
		const subject = mount(
			<ThumbnailItem
				label="label"
				type="square"
			/>
		);

		const expected = 'label';
		const actual = subject.prop('label');

		expect(actual).toBe(expected);
	});
});
