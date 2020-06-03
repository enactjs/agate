import React from 'react';
import {shallow} from 'enzyme';
import {ImageItemBase} from '../ImageItem';

describe('ImageItem', () => {
	test('should omit caption node when `children` is unset', () => {
		const subject = shallow(
			<ImageItemBase />
		);

		const actual = subject.find('.caption');

		expect(actual).toHaveLength(0);
	});
});