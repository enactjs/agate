import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';

import ImageItem from '../../ImageItem';
import {VirtualGridList} from '../VirtualList';

describe('VirtualGridList with native `scrollMode`', () => {
	let
		clientSize,
		dataSize,
		items,
		itemSize,
		renderItem,
		svgGenerator;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];
		itemSize = {minWidth: 300, minHeight:240};

		renderItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name
			const {source, subText, text} = items[index];

			return (
				<ImageItem {...rest} label={subText} src={source}>
					{text}
				</ImageItem>
			);
		};

		svgGenerator = (width, height, bgColor, textColor, customText) => (
			`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
			`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
			`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
		);

		const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0;
		const headingZeros = Array(itemNumberDigits).join('0');

		for (let i = 0; i < dataSize; i++) {
			const count = (headingZeros + i).slice(-itemNumberDigits),
				text = `Item ${count}`,
				subText = `SubItem ${count}`,
				color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16),
				source = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`);

			items.push({text, subText, source});
		}
	});

	afterEach(() => {
		clientSize = null;
		dataSize = null;
		items = null;
		itemSize = null;
		renderItem = null;
	});

	test('should render a list of `items`', () => {
		render(
			<VirtualGridList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const expected = 'Item 000';
		const actual = screen.getByRole('list').children.item(0).textContent;

		expect(actual).toBe(expected);
	});

	test('cannot render items when `clientSize` and outer DOM size are not specified', () => {
		render(
			<VirtualGridList
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const expected = 0;
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render (clientHeight / itemHeight + overhang) items', () => {
		render(
			<VirtualGridList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const expected = 24; // (4 * (720 / 240)) + 4 * 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should re-render (clientHeight / itemHeight + overhang) items after changing `clientSize`', () => {
		const {rerender} = render(
			<VirtualGridList
				clientSize={clientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const newClientSize = {clientWidth: 1280, clientHeight: 360};

		rerender(
			<VirtualGridList
				clientSize={newClientSize}
				dataSize={dataSize}
				itemRenderer={renderItem}
				itemSize={itemSize}
				scrollMode="native"
			/>
		);

		const expected = 20; // (4 * (360 / 240)) + 4 * 3
		const actual = screen.getByRole('list').children.length;

		expect(actual).toBe(expected);
	});

	test('should render only one scrollbar', () => {
		render(
			<VirtualGridList
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
		test('should render both horizontal and vertical scrollbars when `horizontalScrollbar` and `verticalScrollbar` are `visible`', () => {
			render(
				<VirtualGridList
					clientSize={clientSize}
					dataSize={dataSize}
					direction="horizontal"
					horizontalScrollbar="visible"
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="native"
					verticalScrollbar="visible"
				/>
			);

			const virtualGridListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualGridListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualGridListRoot.children.item(1);

			expect(verticalScrollbar).toHaveClass('scrollbar vertical');
			expect(horizontalScrollbar).toHaveClass('scrollbar horizontal');
		});

		test('should render only vertical scrollbar when `verticalScrollbar` is `visible` and `horizontalScrollbar` is `hidden`', () => {
			render(
				<VirtualGridList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={itemSize}
					scrollMode="native"
				/>
			);

			const virtualGridListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualGridListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualGridListRoot.children.item(1);

			expect(verticalScrollbar).toBeInTheDocument();
			expect(verticalScrollbar).toHaveClass('scrollbar vertical');
			expect(horizontalScrollbar).toBeNull();
		});

		test('should not render any scrollbar when `horizontalScrollbar` and `verticalScrollbar` are `hidden`', () => {
			render(
				<VirtualGridList
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

			const virtualGridListRoot =  screen.getByRole('list').parentElement.parentElement.parentElement.parentElement;
			const verticalScrollbar = virtualGridListRoot.children.item(0).children.item(1);
			const horizontalScrollbar = virtualGridListRoot.children.item(1);

			expect(verticalScrollbar).toBeNull();
			expect(horizontalScrollbar).toBeNull();
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
				<VirtualGridList
					clientSize={clientSize}
					dataSize={itemArray.length}
					itemRenderer={renderItemArray}
					itemSize={itemSize}
					scrollMode="native"
				/>
			);

			itemArray.unshift({name: 'Password 0'});
			rerender(<VirtualGridList
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
