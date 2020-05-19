import React from 'react';
import {mount} from 'enzyme';
import GridListImageItem from '../GridListImageItem';

const caption = 'Caption';
const subCaption = 'Sub Caption';

describe('GridListImageItem Specs', () => {
	test('should have `caption`', () => {
		const content = mount(
			<GridListImageItem caption={caption} />
		);

		const expected = caption;
		const actual = content.find('.caption').hostNodes().first().text();

		expect(actual).toBe(expected);
	});

	test('should have `subCaption`', () => {
		const content = mount(
			<GridListImageItem subCaption={subCaption} />
		);

		const expected = subCaption;
		const actual = content.find('.subCaption').hostNodes().first().text();

		expect(actual).toBe(expected);
	});
});
