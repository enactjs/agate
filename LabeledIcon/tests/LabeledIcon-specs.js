import {mount} from 'enzyme';
import React from 'react';

import LabeledIcon from '../LabeledIcon';

import css from '../LabeledIcon.module.less';

describe('LabeledIcon Specs', () => {
	test('should support label when given children', () => {
		const subject = mount(
			<LabeledIcon>Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'Hello LabeledIcon';
		const actual = subject.find('label').text();

		expect(actual).toBe(expected);
	});

	test('should apply flipBoth class when flip prop equals "both"', () => {
		const subject = mount(
			<LabeledIcon flip="both">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'flipBoth';
		const actual = subject.find(`div.${css.icon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply flipHorizontal class when flip prop equals "horizontal"', () => {
		const subject = mount(
			<LabeledIcon flip="horizontal">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'flipHorizontal';
		const actual = subject.find(`div.${css.icon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply flipVertical class when flip prop equals "vertical"', () => {
		const subject = mount(
			<LabeledIcon flip="vertical">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'flipVertical';
		const actual = subject.find(`div.${css.icon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should support custom icon', () => {
		const expected = 'happyface';
		const subject = mount(
			<LabeledIcon icon={expected}>Hello LabeledIcon</LabeledIcon>
		);

		const actual = subject.find('Icon').prop('children');

		expect(actual).toBe(expected);
	});

	test('should apply inline class when inline prop is set to true', () => {
		const subject = mount(
			<LabeledIcon inline>Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'inline';
		const actual = subject.find(`div.${css.labeledIcon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have above class when labelPosition prop equals "above"', () => {
		const subject = mount(
			<LabeledIcon labelPosition="above">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'above';
		const actual = subject.find(`div.${css.labeledIcon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have below class by default', () => {
		const subject = mount(
			<LabeledIcon>Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'below';
		const actual = subject.find(`div.${css.labeledIcon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have before class when labelPosition prop equals "before"', () => {
		const subject = mount(
			<LabeledIcon labelPosition="before">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'before';
		const actual = subject.find(`div.${css.labeledIcon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have after class when labelPosition prop equals "after"', () => {
		const subject = mount(
			<LabeledIcon labelPosition="after">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'after';
		const actual = subject.find(`div.${css.labeledIcon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have left class when labelPosition prop equals "left"', () => {
		const subject = mount(
			<LabeledIcon labelPosition="left">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'left';
		const actual = subject.find(`div.${css.labeledIcon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have right class when labelPosition prop equals "right"', () => {
		const subject = mount(
			<LabeledIcon labelPosition="right">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'right';
		const actual = subject.find(`div.${css.labeledIcon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply small class to Icon when size prop equals "small"', () => {
		const subject = mount(
			<LabeledIcon size="small">Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'small';
		const actual = subject.find(`div.${css.icon}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply large class to Icon by default', () => {
		const subject = mount(
			<LabeledIcon>Hello LabeledIcon</LabeledIcon>
		);

		const expected = 'large';
		const actual = subject.find(`div.${css.icon}`).prop('className');

		expect(actual).toContain(expected);
	});
});
