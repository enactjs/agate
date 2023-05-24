import ilib from 'ilib';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TimePicker, {timeToLocaleString} from '../TimePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('TimePicker', () => {
	// Suite-wide setup

	test('should emit an onChange event when changing the hour', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<TimePicker
				locale="en-US"
				onChange={handleChange}
				value={new Date(2000, 6, 15, 12, 30)}
			/>
		);

		await user.click(screen.getByLabelText('12 hour next item'));

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should emit an onChange event when changing the minute', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<TimePicker
				locale="en-US"
				onChange={handleChange}
				value={new Date(2000, 6, 15, 12, 30)}
			/>
		);

		await user.click(screen.getByLabelText('30 minute increase the value'));

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should emit an onChange event when changing the meridiem', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<TimePicker
				locale="en-US"
				onChange={handleChange}
				value={new Date(2000, 6, 15, 12, 30)}
			/>
		);

		await user.click(screen.getByLabelText('PM previous item'));

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should emit an onChange event when changing the meridiem on a 5 meridiem locale', async () => {
		ilib.setLocale('am-ET');
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<TimePicker
				locale="am-ET"
				onChange={handleChange}
				value={new Date(2000, 6, 15, 12, 30)}
			/>
		);

		await user.click(screen.getByLabelText('ከሰዓት previous item'));

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		ilib.setLocale('en-US');
		render(<TimePicker locale="en-US" value={new Date(2000, 0, 1, 12, 30)} />);
		const minute = screen.getAllByRole('spinbutton')[1];

		const expectedMinute = '30';

		expect(minute).toHaveTextContent(expectedMinute);
	});

	test('should set "hourAriaLabel" to hour picker', () => {
		const label = 'custom hour aria-label';
		render(
			<TimePicker
				hourAriaLabel={label}
				locale="en-US"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const hourPicker = screen.getByLabelText(label);

		const expected = '12';

		expect(hourPicker).toHaveTextContent(expected);
	});

	test('should set "meridiemAriaLabel" to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		render(
			<TimePicker
				locale="en-US"
				meridiemAriaLabel={label}
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const meridiemPicker = screen.getByLabelText(label);

		const expected = 'PM';

		expect(meridiemPicker).toHaveTextContent(expected);
	});

	test('should set "minuteAriaLabel" to minute picker', () => {
		const label = 'custom minute aria-label';
		render(
			<TimePicker
				locale="en-US"
				minuteAriaLabel={label}
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const minutePicker = screen.getByLabelText(label);

		const expected = '30';

		expect(minutePicker).toHaveTextContent(expected);
	});

	test('should display the correct meridiem for cases of more than 2 meridiems', () => {
		ilib.setLocale('am-ET');
		const time = new Date(2000, 0, 1, 12, 30);
		const secondTime = new Date(2000, 0, 1, 11, 30);

		const {rerender} = render(<TimePicker locale="am-ET" value={time} />);
		const firstMeridiemDisplayed = screen.queryByText('ከሰዓት');

		rerender(<TimePicker locale="am-ET" value={secondTime} />);
		const secondMeridiemDisplayed = screen.queryByText('ጥዋት');

		expect(firstMeridiemDisplayed).not.toBeNull();
		expect(secondMeridiemDisplayed).not.toBeNull();
	});

	describe('#timeToLocaleString', () => {
		test('method should convert time to a localized string', () => {
			ilib.setLocale('en-US');
			const date = new Date(2000, 0, 1);

			const expected = '12:00 AM';
			const actual = timeToLocaleString(date);

			expect(actual).toBe(expected);
		});

		test('method should return `null` for an invalid time', () => {
			const time = timeToLocaleString(null);

			expect(time).toBeNull();
		});
	});
});
