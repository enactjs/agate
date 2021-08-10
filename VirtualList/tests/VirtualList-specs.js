import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

describe('VirtualList', () => {
	let
		clientSize,
		dataSize,
		getScrollTo,
		handlerOnScroll,
		handlerOnScrollStart,
		handlerOnScrollStop,
		items,
		myScrollTo,
		onScrollCount,
		onScrollStartCount,
		onScrollStopCount,
		renderItem,
		resultScrollLeft,
		resultScrollTop;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		onScrollCount = 0;
		onScrollStartCount = 0;
		onScrollStopCount = 0;
		resultScrollLeft = 0;
		resultScrollTop = 0;

		getScrollTo = (scrollTo) => {
			myScrollTo = scrollTo;
		};
		handlerOnScroll = () => {
			onScrollCount++;
		};
		handlerOnScrollStart = () => {
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
		myScrollTo = null;
		onScrollCount = null;
		onScrollStartCount = null;
		onScrollStopCount = null;
		renderItem = null;
		resultScrollLeft = null;
		resultScrollTop = null;
	});

	test('should render a list of \'items\'', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={60}
			/>
		);

		const expected = 'Account 0';
		const actual = screen.getByRole('list').children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('should render (clientHeight / itemHeight + overhang) items', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={60}
			/>
		);

		const expected = 15; // 720 / 60 + 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render only one scrollbar', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				direction="horizontal"
				itemRenderer={renderItem}
				itemSize={60}
			/>
		);

		const expected = 1;
		const actual = screen.getByRole('list').parentElement.parentElement.children.length;

		expect(actual).toBe(expected);
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
					itemSize={60}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			myScrollTo({index: 10, animate: false});
		});

		test('should scroll to the given \'x\' position with scrollTo', (done) => {
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
					itemSize={60}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			myScrollTo({position: {x: 200}, animate: false});
		});

		test('should scroll to the given \'y\' position with scrollTo', (done) => {
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
					itemSize={60}
					onScrollStop={onScrollStop}
					scrollMode="translate"
				/>
			);

			myScrollTo({position: {y: 200}, animate: false});
		});

		describe('scroll events', () => {
			test('should call onScrollStart once', () => {
				render(
					<VirtualList
						cbScrollTo={getScrollTo}
						clientSize={clientSize}
						dataSize={dataSize}
						itemRenderer={renderItem}
						itemSize={30}
						onScrollStart={handlerOnScrollStart}
					/>
				);

				myScrollTo({position: {y: 100}, animate: false});

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
					/>
				);

				myScrollTo({position: {y: 100}, animate: false});

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
					/>
				);

				myScrollTo({position: {y: 100}, animate: false});
			});
		});
	});

	describe('Adding an item', () => {
		test('should render an added item named \'Password 0\' as the first item', (done) => {
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
					itemSize={60}
				/>
			);

			itemArray.unshift({name: 'Password 0'});
			rerender(<VirtualList
				clientSize={clientSize}
				dataSize={itemArray.length}
				itemRenderer={renderItemArray}
				itemSize={60}
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
				/>
			);

			const expectedAttribute = 'aria-label';
			const expectedValue = label;

			const actual = screen.getAllByRole('button')[1];

			expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
		});
	});
});
