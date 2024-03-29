import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

describe('VirtualList with translate `scrollMode`', () => {
	let
		clientSize,
		dataSize,
		getScrollTo,
		handlerOnScroll,
		handlerOnScrollStart,
		handlerOnScrollStop,
		items,
		itemSize,
		myScrollTo,
		onScrollCount,
		onScrollStartCount,
		onScrollStopCount,
		renderItem,
		resultScrollLeft,
		resultScrollTop,
		startScrollTop;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		itemSize = 60;
		onScrollCount = 0;
		onScrollStartCount = 0;
		onScrollStopCount = 0;
		resultScrollLeft = 0;
		resultScrollTop = 0;
		startScrollTop = 0;

		getScrollTo = (scrollTo) => {
			myScrollTo = scrollTo;
		};
		handlerOnScroll = () => {
			onScrollCount++;
		};
		handlerOnScrollStart = (e) => {
			startScrollTop = e.scrollTop;
			onScrollStartCount++;
		};
		handlerOnScrollStop = (done, testCase) => (e) => {
			onScrollStopCount++;
			resultScrollLeft = e.scrollLeft;
			resultScrollTop = e.scrollTop;

			testCase();
			done();
		};
		renderItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name
			return (
				<Item {...rest}>
					{items[index].name}
				</Item>
			);
		};

		for (let i = 0; i < dataSize; i++) {
			items.push({name: 'Account ' + i});
		}
	});

	afterEach(() => {
		clientSize = null;
		dataSize = null;
		getScrollTo = null;
		handlerOnScroll = null;
		handlerOnScrollStart = null;
		handlerOnScrollStop = null;
		items = null;
		itemSize = null;
		myScrollTo = null;
		onScrollCount = null;
		onScrollStartCount = null;
		onScrollStopCount = null;
		renderItem = null;
		resultScrollLeft = null;
		resultScrollTop = null;
		startScrollTop = null;
	});

	test('should render a list of items', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 'Account 0';
		const actual = screen.getByRole('list').children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('should render overhang items when `clientSize` and outer DOM size are not specified', () => {
		render(
			<VirtualList
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 3;
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render (clientHeight / itemHeight + overhang) items', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 15; // 720 / 60 + 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should re-render (clientHeight / itemHeight + overhang) items after changing `clientSize`', () => {
		const {rerender} = render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const newClientSize = {clientWidth: 1280, clientHeight: 360};

		rerender(
			<VirtualList
				clientSize={newClientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 9; // 360 / 60 + 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render only one scrollbar when `direction` is `horizontal`', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				direction="horizontal"
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="translate"
			/>
		);

		const expected = 2; // One for the list and another for the horizontal scrollbar
		const actual = screen.getByRole('list').parentElement.parentElement.parentElement.parentElement.children.length;

		expect(actual).toBe(expected);
	});

	describe('Scrollbar visibility', () => {
		test('should render both horizontal and vertical scrollbars when `horizontalScrollbar` and `verticalScrollbar` are `visible`', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					horizontalScrollbar="visible"
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="translate"
					verticalScrollbar="visible"
				/>
			);

			const virtualListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualListRoot.children.item(1);

			expect(verticalScrollbar).toHaveClass('scrollbar vertical');
			expect(horizontalScrollbar).toHaveClass('scrollbar horizontal');
		});

		test('should render only vertical scrollbar when `verticalScrollbar` is `visible` and `horizontalScrollbar` is `hidden`', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					horizontalScrollbar="hidden"
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="translate"
					verticalScrollbar="visible"
				/>
			);

			const virtualListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualListRoot.children.item(1);

			expect(verticalScrollbar).toBeInTheDocument();
			expect(verticalScrollbar).toHaveClass('scrollbar vertical');
			expect(horizontalScrollbar).toBeNull();
		});

		test('should not render any scrollbar when `horizontalScrollbar` and `verticalScrollbar` are `hidden`', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					horizontalScrollbar="hidden"
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="translate"
					verticalScrollbar="hidden"
				/>
			);

			const virtualListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualListRoot.children.item(1);

			expect(verticalScrollbar).toBeNull();
			expect(horizontalScrollbar).toBeNull();
		});
	});

	describe('ScrollTo', () => {
		test('should scroll to the specific item of a given index with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 600;

				expect(resultScrollTop).toBe(expected);
			});

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({index: 10, animate: false}));
		});

		test('should scroll to the given `x` position with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 200;

				expect(resultScrollLeft).toBe(expected);
			});

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({position: {x: 200}, animate: false}));
		});

		test('should scroll to the given `y` position with scrollTo', (done) => {
			const onScrollStop = handlerOnScrollStop(done, () => {
				const expected = 200;

				expect(resultScrollTop).toBe(expected);
			});

			render(
				<VirtualList
					cbScrollTo={getScrollTo}
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			act(() => myScrollTo({position: {y: 200}, animate: false}));
		});

		describe('Scroll events', () => {
			test('should call onScrollStart once', () => {
				render(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={30}
						onScrollStart={handlerOnScrollStart}
						scrollMode="translate"
					/>
				);

				act(() => myScrollTo({position: {y: 100}, animate: false}));

				const expected = 1;

				expect(onScrollStartCount).toBe(expected);
			});

			test('should call onScroll once', () => {
				render(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={30}
						onScroll={handlerOnScroll}
						scrollMode="translate"
					/>
				);

				act(() => myScrollTo({position: {y: 100}, animate: false}));

				const expected = 1;

				expect(onScrollCount).toBe(expected);
			});

			test('should call onScrollStop once', (done) => {
				const onScrollStop = handlerOnScrollStop(done, () => {
					const expected = 1;

					expect(onScrollStopCount).toBe(expected);
				});

				render(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={30}
						onScrollStop={onScrollStop}
						scrollMode="translate"
					/>
				);

				act(() => myScrollTo({position: {y: 100}, animate: false}));
			});
		});
	});

	describe('Scroll by event', () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		test('should scroll by wheel', (done) => {
			const fn = jest.fn();

			const onScrollStop = handlerOnScrollStop(done, () => {
				fn();
				expect(startScrollTop).toBe(0);
				expect(onScrollStartCount).toBe(1);
				expect(resultScrollTop).toBeGreaterThan(0);
			});

			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					onScrollStart={handlerOnScrollStart}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			fireEvent.wheel(list, {deltaY: 100});

			act(() => jest.advanceTimersByTime(1000)); // Wait onScrollStop

			expect(fn).toBeCalled();
		});

		test('should not scroll by wheel when `noScrollByWheel` prop is true', (done) => {
			const fn = jest.fn();

			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					noScrollByWheel
					onScrollStart={handlerOnScrollStart}
					onScrollStop={fn}
					scrollMode="translate"
				/>
			);

			const list = screen.getByRole('list');
			fireEvent.wheel(list, {deltaY: 100});

			act(() => jest.advanceTimersByTime(1000)); // Wait onScrollStop

			expect(fn).not.toHaveBeenCalled();

			done();
		});
	});

	describe('Adding an item', () => {
		test('should render an added item named `Password 0` as the first item', (done) => {
			const itemArray = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
			const renderItemArray = ({index, ...rest}) => {
				return (
					<div {...rest} id={'item' + index}>
						{itemArray[index].name}
					</div>
				);
			};

			const {rerender} = render(
				<VirtualList
					clientSize={clientSize}
					dataSize={itemArray.length}
					itemRenderer={renderItemArray}
					itemSize={itemSize}
					scrollMode="translate"
				/>
			);

			itemArray.unshift({name: 'Password 0'});

			rerender(<VirtualList
				clientSize={clientSize}
				dataSize={itemArray.length}
				itemRenderer={renderItemArray}
				itemSize={itemSize}
				scrollMode="translate"
			/>);

			setTimeout(() => {
				const expected = itemArray[0].name;
				const actual = screen.getByRole('list').children.item(0).textContent;

				expect(actual).toBe(expected);
				done();
			}, 0);
		});
	});

	describe('Scrollbar accessibility', () => {
		test('should set `aria-label` to previous scroll button in the horizontal scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={30}
					scrollLeftAriaLabel={label}
					scrollMode="translate"
				/>
			);

			const expectedAttribute = 'aria-label';
			const expectedValue = label;

			const actual = screen.getAllByRole('button')[0];

			expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set `aria-label` to next scroll button in the horizontal scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={30}
					scrollMode="translate"
					scrollRightAriaLabel={label}
				/>
			);

			const expectedAttribute = 'aria-label';
			const expectedValue = label;

			const actual = screen.getAllByRole('button')[1];

			expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set `aria-label` to previous scroll button in the vertical scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="vertical"
					itemRenderer={renderItem}
					itemSize={30}
					scrollMode="translate"
					scrollUpAriaLabel={label}
				/>
			);

			const expectedAttribute = 'aria-label';
			const expectedValue = label;

			const actual = screen.getAllByRole('button')[0];

			expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set `aria-label` to next scroll button in the vertical scrollbar', () => {
			const label = 'custom button aria label';
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="vertical"
					itemRenderer={renderItem}
					itemSize={30}
					scrollDownAriaLabel={label}
					scrollMode="translate"
				/>
			);

			const expectedAttribute = 'aria-label';
			const expectedValue = label;

			const actual = screen.getAllByRole('button')[1];

			expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
		});
	});
});
