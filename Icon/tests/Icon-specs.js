import React from 'react';
import {mount} from 'enzyme';
import {IconBase as Icon} from '../Icon';

describe('Icon Specs', () => {

	test('should return the correct Unicode value for named icon \'wifi\'', function () {
		const icon = mount(
			<Icon>wifi</Icon>
		);

		const expected = 983059; // decimal converted charCode of Unicode 'star' character
		const actual = icon.text().codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided \'star\' hex value', function () {
		const icon = mount(
			<Icon>0x0F0028</Icon>
		);

		const expected = 983080; // decimal converted charCode of character
		const actual = icon.text().codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided HTML entity as hex value', function () {
		const icon = mount(
			<Icon>&#x2605;</Icon>
		);

		const expected = 9733; // decimal converted charCode of character
		const actual = icon.text().codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided Unicode reference', function () {
		const icon = mount(
			<Icon>\u0F0028</Icon>
		);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = icon.text().codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support high code point Unicode values', function () {
		const icon = mount(
			<Icon>{String.fromCodePoint(0x0F0028)}</Icon>
		);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = icon.text().codePointAt();

		expect(actual).toBe(expected);
	});
});
