import React from 'react';
import {mount} from 'enzyme';
import ProgressBar from '../ProgressBar';

import css from '../../ProgressBar/ProgressBar.module.less';

describe('ProgressBar Specs', () => {
	test('should add the highlighted class when given the highlighted prop', () => {
		const progressBar = mount(
			<ProgressBar highlighted />
		);

		const expected = css.highlighted;
		const actual = progressBar.find('div[role="progressbar"]').prop('className');

		expect(actual).toContain(expected);
	});

	test('should only show tooltip when tooltip is true', () => {
		const progressBar = mount(
			<ProgressBar tooltip />
		);

		const expected = 1;
		const actual = progressBar.find('ProgressBarTooltip').length;

		expect(actual).toBe(expected);
	});

	test('should have tooltip show progress as percentage', () => {
		const progressBar = mount(
			<ProgressBar
				tooltip
				progress={0.6}
			/>
		);

		const expected = '60%';
		const actual = progressBar.find('ProgressBarTooltip').text();

		expect(actual).toBe(expected);
	});
});
