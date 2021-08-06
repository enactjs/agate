import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ProgressBar from '../ProgressBar';

describe('ProgressBar Specs', () => {
	test('should only show tooltip when tooltip is true', () => {
		render(
			<ProgressBar tooltip />
		);
		const progressBar = screen.getByRole('progressbar').children.item(1);
		const expected = 'tooltip';

		expect(progressBar).toHaveClass(expected);
	});

	test('should have tooltip show progress as percentage', () => {
		render(
			<ProgressBar
				tooltip
				progress={0.6}
			/>
		);

		const expected = '60%';
		const actual = screen.getByRole('progressbar').textContent;

		expect(actual).toBe(expected);
	});

	// test('should only show tooltip when tooltip is true', () => {
	// 	const progressBar = mount(
	// 		<ProgressBar tooltip />
	// 	);
	//
	// 	const expected = 1;
	// 	const actual = progressBar.find('ProgressBarTooltip').length;
	//
	// 	expect(actual).toBe(expected);
	// });
	//
	// test('should have tooltip show progress as percentage', () => {
	// 	const progressBar = mount(
	// 		<ProgressBar
	// 			tooltip
	// 			progress={0.6}
	// 		/>
	// 	);
	//
	// 	const expected = '60%';
	// 	const actual = progressBar.find('ProgressBarTooltip').text();
	//
	// 	expect(actual).toBe(expected);
	// });
});
