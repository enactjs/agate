import React from 'react';
import {mount} from 'enzyme';
import Divider from '../Divider';
import css from '../Divider.module.less';

describe('Divider Specs', () => {
	it('should render a Divider with content', function () {
		const content = 'Hello Divider!';

		const divider = mount(
			<Divider>{content}</Divider>
		);

		const expected = content;
		const actual = divider.text();

		expect(actual).to.equal(expected);
	});

	it('should render with spacing class', function () {
		const content = 'Hello Divider!';

		const divider = mount(
			<Divider spacing="medium">{content}</Divider>
		);

		const expected = true;
		const actual = divider.find('h3').hasClass(css.medium);

		expect(actual).to.equal(expected);
	});
});
