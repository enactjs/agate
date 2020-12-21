import React from 'react';
import {mount} from 'enzyme';
import IncrementSlider from '../IncrementSlider';

import css from '../IncrementSlider.module.less';

const getNode = (slider) => slider.find(`div.${css.slider}`);
const focus = (slider) => getNode(slider).simulate('focus');

const tap = (node) => {
	node.simulate('mousedown');
	node.simulate('mouseup');
};
const decrement = (slider) => tap(slider.find(`IncrementSliderButton.${css.decrementButton}`));
const increment = (slider) => tap(slider.find(`IncrementSliderButton.${css.incrementButton}`));

describe('IncrementSlider Specs', () => {
	test('should decrement value', () => {
		const handleChange = jest.fn();
		const value = 50;
		const incrementSlider = mount(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);

		decrement(incrementSlider);

		const expected = value - 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment value', () => {
		const handleChange = jest.fn();
		const value = 50;
		const incrementSlider = mount(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);

		increment(incrementSlider);

		const expected = value + 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should only call onChange once', () => {
		const handleChange = jest.fn();
		const value = 50;
		const incrementSlider = mount(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);

		increment(incrementSlider);

		const expected = 1;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should not call onChange on prop change', () => {
		const handleChange = jest.fn();
		const value = 50;
		const incrementSlider = mount(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);

		incrementSlider.setProps({onChange: handleChange, value: value + 1});

		const expected = 0;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should disable decrement button when value === min', () => {
		const incrementSlider = mount(
			<IncrementSlider
				value={0}
				min={0}
			/>
		);

		const expected = true;
		const actual = incrementSlider.find(`IncrementSliderButton.${css.decrementButton}`).prop('disabled');

		expect(actual).toBe(expected);
	});

	test('should disable increment button when value === max', () => {
		const incrementSlider = mount(
			<IncrementSlider
				value={10}
				max={10}
			/>
		);

		const expected = true;
		const actual = incrementSlider.find(`IncrementSliderButton.${css.incrementButton}`).prop('disabled');

		expect(actual).toBe(expected);
	});

	test('should use custom incrementIcon', () => {
		const icon = 'plus';
		const incrementSlider = mount(
			<IncrementSlider incrementIcon={icon} />
		);

		const expected = icon;
		const actual = incrementSlider.find(`.${css.incrementButton} Icon`).prop('children');

		expect(actual).toBe(expected);
	});

	test('should use custom decrementIcon', () => {
		const icon = 'minus';
		const incrementSlider = mount(
			<IncrementSlider decrementIcon={icon} />
		);

		const expected = icon;
		const actual = incrementSlider.find(`.${css.decrementButton} Icon`).prop('children');

		expect(actual).toBe(expected);
	});

	test(
		'should set decrementButton "aria-label" to value and hint string',
		() => {
			const incrementSlider = mount(
				<IncrementSlider value={10} />
			);

			const expected = '10 press button to decrease the value';
			const actual = incrementSlider.find(`IncrementSliderButton.${css.decrementButton}`).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set decrementButton "aria-label" to decrementAriaLabel',
		() => {
			const label = 'decrement aria label';
			const incrementSlider = mount(
				<IncrementSlider value={10} decrementAriaLabel={label} />
			);

			const expected = `10 ${label}`;
			const actual = incrementSlider.find(`IncrementSliderButton.${css.decrementButton}`).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set decrementButton "aria-label" when decrementButton is disabled',
		() => {
			const incrementSlider = mount(
				<IncrementSlider disabled value={10} />
			);

			const expected = '10 press button to decrease the value';
			const actual = incrementSlider.find(`IncrementSliderButton.${css.decrementButton}`).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set incrementButton "aria-label" to value and hint string',
		() => {
			const incrementSlider = mount(
				<IncrementSlider value={10} />
			);

			const expected = '10 press button to increase the value';
			const actual = incrementSlider.find(`IncrementSliderButton.${css.incrementButton}`).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set incrementButton "aria-label" to incrementAriaLabel',
		() => {
			const label = 'increment aria label';
			const incrementSlider = mount(
				<IncrementSlider value={10} incrementAriaLabel={label} />
			);

			const expected = `10 ${label}`;
			const actual = incrementSlider.find(`IncrementSliderButton.${css.incrementButton}`).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set incrementButton "aria-label" when incrementButton is disabled',
		() => {
			const incrementSlider = mount(
				<IncrementSlider disabled value={10} />
			);

			const expected = '10 press button to increase the value';
			const actual = incrementSlider.find(`IncrementSliderButton.${css.incrementButton}`).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test('should set the tooltip to visible when focused', () => {
		const subject = mount(
			<IncrementSlider tooltip />
		);

		focus(subject);

		const expected = 'visible';
		const actual = subject.find('ProgressBarTooltip').prop('visible') ? 'visible' : 'not visible';

		expect(actual).toBe(expected);
	});

	test('should set the tooltip to not visible when unfocused', () => {
		const subject = mount(
			<IncrementSlider tooltip />
		);

		const expected = 'not visible';
		const actual = subject.find('ProgressBarTooltip').prop('visible') ? 'visible' : 'not visible';

		expect(actual).toBe(expected);
	});
});
