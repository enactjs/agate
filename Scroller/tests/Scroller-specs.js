import ri from '@enact/ui/resolution';
import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Scroller from '../Scroller';

const keyDown = (keyCode) => (button) => fireEvent.keyDown(button, {keyCode});
const keyUp = (keyCode) => (button) => fireEvent.keyUp(button, {keyCode});

const enterKeyDown = keyDown(13);
const enterKeyUp = keyUp(13);
const arrowDownKeyDown = keyDown(40);
const arrowDownKeyUp = keyUp(40);

describe('Scroller', () => {
	let contents;

	beforeEach(() => {
		contents = (
			<div
				style={{
					height: ri.scaleToRem(2004),
					width: ri.scaleToRem(4002)
				}}
			>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
					Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
				</div>
				<div
					style={{
						marginTop: ri.scaleToRem(1602)
					}}
				>
					<div>
						Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
					</div>
				</div>
			</div>
		);
	});

	afterEach(() => {
		contents = null;
	});

	describe('Scrollbar visibility', () => {
		test(
			'should render both horizontal and vertical scrollbars when `horizontalScrollbar` and `verticalScrollbar` are `visible`',
			() => {
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);
				const scrollButtons = screen.getAllByRole('button');

				const expected = 4;

				expect(scrollButtons).toHaveLength(expected);
			}
		);

		test(
			'should render only vertical scrollbar when `verticalScrollbar` is `visible` and `horizontalScrollbar` is `hidden`',
			() => {
				render(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);
				const scrollButtons = screen.getAllByRole('button');

				const expectedLength = 2;
				const expectedClass = 'vertical';
				const actual = scrollButtons[0].parentElement;

				expect(scrollButtons).toHaveLength(expectedLength);
				expect(actual).toHaveClass(expectedClass);
			}
		);

		test(
			'should render only vertical scrollbar when `verticalScrollbar` is `hidden` and `horizontalScrollbar` is `visible`',
			() => {
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollbar="hidden"
					>
						{contents}
					</Scroller>
				);
				const scrollButtons = screen.getAllByRole('button');

				const expectedLength = 2;
				const expectedClass = 'horizontal';
				const actual = scrollButtons[0].parentElement;

				expect(scrollButtons).toHaveLength(expectedLength);
				expect(actual).toHaveClass(expectedClass);
			}
		);

		test(
			'should not render any scrollbar when when `horizontalScrollbar` and `verticalScrollbar` are `hidden`',
			() => {
				render(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						{contents}
					</Scroller>
				);
				const scrollButtons = screen.queryAllByRole('button');

				const expected = 0;

				expect(scrollButtons).toHaveLength(expected);
			}
		);
	});

	describe('Scrollbar accessibility', () => {
		test('should set a custom `aria-label` to the up scroll button in the vertical scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<Scroller
					horizontalScrollbar="visible"
					scrollUpAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);
			const upButton = screen.getByLabelText(label);

			const expected = 'vertical';
			const actual = upButton.parentElement;

			expect(upButton).toBeInTheDocument();
			expect(actual).toHaveClass(expected);
		});

		test('should set a custom `aria-label` to the down scroll button in the vertical scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<Scroller
					horizontalScrollbar="visible"
					scrollDownAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);
			const downButton = screen.getByLabelText(label);

			const expected = 'vertical';
			const actual = downButton.parentElement;

			expect(downButton).toBeInTheDocument();
			expect(actual).toHaveClass(expected);
		});

		test('should set a custom `aria-label` to the left scroll button in the horizontal scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<Scroller
					horizontalScrollbar="visible"
					scrollLeftAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);
			const leftButton = screen.getByLabelText(label);

			const expected = 'horizontal';
			const actual = leftButton.parentElement;

			expect(leftButton).toBeInTheDocument();
			expect(actual).toHaveClass(expected);
		});

		test('should set a custom `aria-label` to the right scroll button in the horizontal scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<Scroller
					horizontalScrollbar="visible"
					scrollRightAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);
			const rightButton = screen.getByLabelText(label);

			const expected = 'horizontal';
			const actual = rightButton.parentElement;

			expect(rightButton).toBeInTheDocument();
			expect(actual).toHaveClass(expected);
		});

		test('should set a null string `aria-label` to the up scroll button in the vertical scrollbar', () => {
			const label = '';
			render(
				<Scroller
					horizontalScrollbar="hidden"
					scrollUpAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);
			const upButton = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';

			expect(upButton).toHaveAttribute(expectedAttribute, label);
		});

		test('should set a null string `aria-label` to the down scroll button in the vertical scrollbar', () => {
			const label = '';
			render(
				<Scroller
					horizontalScrollbar="visible"
					scrollDownAriaLabel={label}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);
			const downButton = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';

			expect(downButton).toHaveAttribute(expectedAttribute, label);
		});

		test('should set a null string `aria-label` to the left scroll button in the horizontal scrollbar', () => {
			const label = '';
			render(
				<Scroller
					horizontalScrollbar="visible"
					scrollLeftAriaLabel={label}
					verticalScrollbar="hidden"
				>
					{contents}
				</Scroller>
			);
			const leftButton = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';

			expect(leftButton).toHaveAttribute(expectedAttribute, label);
		});

		test('should set a null string `aria-label` to the right scroll button in the horizontal scrollbar', () => {
			const label = '';
			render(
				<Scroller
					horizontalScrollbar="visible"
					scrollRightAriaLabel={label}
					verticalScrollbar="hidden"
				>
					{contents}
				</Scroller>
			);
			const rightButton = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';

			expect(rightButton).toHaveAttribute(expectedAttribute, label);
		});
	});

	describe('Scroller buttons', () => {
		// Does not work
		test('should scroll on `enter`', () => {
			jest.useFakeTimers();
			const spy = jest.fn();
			render(
				<Scroller
					focusableScrollbar
					horizontalScrollbar="visible"
					verticalScrollbar="visible"
					onScrollStart={spy}
				>
					{contents}
				</Scroller>
			);

			const buttons = screen.getAllByRole('button');
			enterKeyUp(buttons[1]);
			act(() => jest.advanceTimersByTime(1500));

			enterKeyDown(buttons[1]);
			act(() => jest.advanceTimersByTime(1500));
			enterKeyUp(buttons[1]);
			act(() => jest.advanceTimersByTime(1500));

			jest.useRealTimers();
			console.log(spy.mock.calls);
		});

		// Does not work
		test('should scroll on click', () => {
			jest.useFakeTimers();
			const spy = jest.fn();
			render(
				<Scroller
					focusableScrollbar
					horizontalScrollbar="visible"
					verticalScrollbar="visible"
					onScrollStart={spy}
				>
					{contents}
				</Scroller>
			);
			const buttons = screen.getAllByRole('button');

			userEvent.click(buttons[1]);
			act(() => jest.advanceTimersByTime(1500));

			jest.useRealTimers();
			console.log(spy.mock.calls);
		});

		test('should change focus on arrow key if `focusableScrollbar`', () => {
			jest.useFakeTimers();
			const spy = jest.fn();
			render(
				<Scroller
					focusableScrollbar
					horizontalScrollbar="visible"
					verticalScrollbar="visible"
					onScrollStart={spy}
				>
					{contents}
				</Scroller>
			);

			const buttons = screen.getAllByRole('button');

			act(() => buttons[0].focus());
			arrowDownKeyDown(buttons[0]);
			arrowDownKeyUp(buttons[0]);

			expect(document.activeElement).toBe(buttons[1]);
		});
	});
});
