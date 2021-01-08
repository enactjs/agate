import {mount} from 'enzyme';
import React from 'react';

import LabeledIconButton from '../LabeledIconButton';

import css from '../LabeledIconButton.module.less';

describe('LabeledIconButton Specs', () => {
	test('should render label when given children', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'Hello LabeledIconButton';
		const actual = subject.find('label').text();

		expect(actual).toBe(expected);
	});

	test('should not render children when no children is passed', () => {
		const subject = mount(
			<LabeledIconButton icon="temperature" />
		);

		const expected = '';
		const actual = subject.find('label').text();

		expect(actual).toBe(expected);
	});

	test('should render disabled LabeledIconButton', () => {
		const subject = mount(
			<LabeledIconButton
				disabled
				icon="temperature"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = true;
		const actual = subject.find('LabeledIconButton').prop('disabled');

		expect(actual).toBe(expected);
	});

	test('should render highlighted LabeledIconButton', () => {
		const subject = mount(
			<LabeledIconButton
				highlighted
				icon="temperature"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'highlighted';
		const actual = subject.find(`div.${css.button}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render selected LabeledIconButton', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				selected
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'selected';
		const actual = subject.find(`div.${css.button}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render inline LabeledIconButton', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				inline
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'inline';
		const actual = subject.find(`div.${css.labeledIconButton}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render smallest LabeledIconButton', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				size="smallest"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'smallest';
		const actual = subject.find(`div.${css.button}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render small LabeledIconButton', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				size="small"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'small';
		const actual = subject.find(`div.${css.button}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render large LabeledIconButton by default', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'large';
		const actual = subject.find(`div.${css.button}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render huge LabeledIconButton', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				size="huge"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'huge';
		const actual = subject.find(`div.${css.button}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render LabeledIconButton with label position left', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				labelPosition="left"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'left';
		const actual = subject.find(`div.${css.labeledIconButton}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render LabeledIconButton with label position right', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				labelPosition="right"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'right';
		const actual = subject.find(`div.${css.labeledIconButton}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render LabeledIconButton with label position above', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				labelPosition="above"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'above';
		const actual = subject.find(`div.${css.labeledIconButton}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should render LabeledIconButton with label position below', () => {
		const subject = mount(
			<LabeledIconButton
				icon="temperature"
				labelPosition="below"
			>
				Hello LabeledIconButton
			</LabeledIconButton>
		);

		const expected = 'below';
		const actual = subject.find(`div.${css.labeledIconButton}`).prop('className');

		expect(actual).toContain(expected);
	});
});
