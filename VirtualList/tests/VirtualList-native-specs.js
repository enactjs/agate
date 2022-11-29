import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

describe('VirtualList with native \'scrollMode\'', () => {
	let
		clientSize,
		dataSize,
		items,
		itemSize,
		renderItem;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		itemSize = 60;

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
		items = null;
		itemSize = null;
		renderItem = null;
	});

	test('should render a list of \'items\'', () => {
		render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const expected = 'Account 0';
		const actual = screen.getByRole('list').children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('should render overhang items when \'clientSize\' and outer DOM size are not specified', () => {
		render(
			<VirtualList
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
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
				scrollMode="native"
			/>
		);

		const expected = 15; // 720 / 60 + 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should re-render (clientHeight / itemHeight + overhang) items after changing \'clientSize\'', () => {
		const {rerender} = render(
			<VirtualList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const newClientSize = {clientWidth: 1280, clientHeight: 360};

		rerender(
			<VirtualList
				clientSize={newClientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const expected = 9; // 360 / 60 + 3
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
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const expected = 2; // One for the list and another for the horizontal scrollbar
		const actual = screen.getByRole('list').parentElement.parentElement.parentElement.parentElement.children.length;

		expect(actual).toBe(expected);
	});

	describe('Scrollbar visibility', () => {
		test('should render both horizontal and vertical scrollbars when \'horizontalScrollbar\' and \'verticalScrollbar\' are `visible`', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={itemSize}
					horizontalScrollbar="visible"
					scrollMode="native"
					verticalScrollbar="visible"
				/>
			);

			const virtualListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualListRoot.children.item(1);

			expect(verticalScrollbar).toHaveClass('scrollbar vertical');
			expect(horizontalScrollbar).toHaveClass('scrollbar horizontal');
		});

		test('should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is `hidden`', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="native"
				/>
			);

			const virtualListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualListRoot.children.item(1);

			expect(verticalScrollbar).toBeInTheDocument();
			expect(verticalScrollbar).toHaveClass('scrollbar vertical');
			expect(horizontalScrollbar).toBeNull();
		});

		test('should not render any scrollbar when when \'horizontalScrollbar\' and \'verticalScrollbar\' are `hidden`', () => {
			render(
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					itemRenderer={renderItem}
					itemSize={itemSize}
					horizontalScrollbar="hidden"
					scrollMode="native"
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
					itemSize={itemSize}
					scrollMode="native"
				/>
			);

			itemArray.unshift({name: 'Password 0'});
			rerender(<VirtualList
				clientSize={clientSize}
				dataSize={itemArray.length}
				itemRenderer={renderItemArray}
				itemSize={itemSize}
				scrollMode="native"
			/>);

			jest.useFakeTimers();

			act(() => jest.advanceTimersByTime(0));
			const expected = itemArray[0].name;
			const actual = screen.getByRole('list').children.item(0).textContent;

			expect(actual).toBe(expected);
			done();

			jest.useRealTimers();
		});
	});
});
