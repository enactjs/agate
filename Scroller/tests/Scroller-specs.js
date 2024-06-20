import ri from '@enact/ui/resolution';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Scroller from '../Scroller';

const focus = (elm) => fireEvent.focus(elm);
const keyDownUp = (keyCode) => (elm) => {
	fireEvent.keyDown(elm, {keyCode});
	return fireEvent.keyUp(elm, {keyCode});
};

const pressEnterKey = keyDownUp(13);
const pressDownKey = keyDownUp(40);
const pressPageUpKey = keyDownUp(33);

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

				// dispatching key event to increase code coverage
				focus(scrollButtons[1]);
				pressDownKey(scrollButtons[1]);
				pressEnterKey(scrollButtons[1]);

				expect(scrollButtons).toHaveLength(expectedLength);
				expect(actual).toHaveClass(expectedClass);
			}
		);

		test(
			'should render only horizontal scrollbar when `verticalScrollbar` is `hidden` and `horizontalScrollbar` is `visible`',
			async () => {
				const user = userEvent.setup();
				render(
					<Scroller
						scrollMode="translate"
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

				// dispatching click event to increase code coverage
				focus(scrollButtons[1]);
				await user.click(scrollButtons[1]);

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

		test('should change focus on arrow key if `focusableScrollbar`', () => {
			jest.useFakeTimers();
			const spy = jest.fn();
			const {rerender} = render(
				<Scroller
					focusableScrollbar
					horizontalScrollbar="visible"
					onScrollStart={spy}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);

			// we need to rerender in order to wait for the scrollButton refs to be populated.
			rerender(
				<Scroller
					focusableScrollbar
					horizontalScrollbar="visible"
					onScrollStart={spy}
					verticalScrollbar="visible"
				>
					{contents}
				</Scroller>
			);

			const buttons = screen.getAllByRole('button');

			focus(buttons[0]);
			pressDownKey(buttons[0]);

			expect(document.activeElement).toBe(buttons[1]);

			// dispatching key event to increase code coverage
			pressPageUpKey(buttons[1]);
			pressPageUpKey(buttons[1]);

			expect(document.activeElement).toBe(buttons[0]);
		});
	});
});
