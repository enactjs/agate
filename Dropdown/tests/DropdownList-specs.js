import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {createRef, Fragment} from 'react';

import DropdownList from '../DropdownList';
import VirtualList from '../../VirtualList';

const options = [
	{children: 'A', key: 'a'},
	{children: 'B', key: 'b'},
	{children: 'C', key: 'c'}
];

const changedOptions = [
	{children: 'A2', key: 'a'},
	{children: 'B2', key: 'b'},
	{children: 'C2', key: 'c'}
];

jest.mock('../../VirtualList', () => {
	const {useEffect} = require('react');
	const scrollTo = jest.fn();

	function MockVirtualList ({cbScrollTo, dataSize, onFocus}) {
		useEffect(() => {
			cbScrollTo(scrollTo);
		}, [cbScrollTo]);

		return (
			<div onFocus={onFocus} role="group">
				{Array.from({length: dataSize}, (_, index) => (
					<div data-index={index} data-testid={`option-${index}`} key={index}>
						{`option ${index}`}
					</div>
				))}
			</div>
		);
	}

	MockVirtualList.scrollTo = scrollTo;

	return MockVirtualList;
});

const settle = (view) => {
	view.rerender(
		<DropdownList selected={0}>
			{options}
		</DropdownList>
	);
};

describe('DropdownList', () => {
	afterEach(() => {
		Spotlight.setPointerMode(false);
		VirtualList.scrollTo.mockClear();
	});

	test('should restore the last 5-way focused item when the list updates', () => {
		Spotlight.setPointerMode(false);
		const view = render(
			<DropdownList selected={0}>
				{options}
			</DropdownList>
		);
		settle(view);

		VirtualList.scrollTo.mockClear();
		fireEvent.focus(screen.getByTestId('option-2'));

		view.rerender(
			<DropdownList selected={0}>
				{changedOptions}
			</DropdownList>
		);

		expect(VirtualList.scrollTo).toHaveBeenCalledWith(expect.objectContaining({
			focus: true,
			index: 2
		}));
	});

	test('should keep the selected item when pointer mode focuses another item', () => {
		Spotlight.setPointerMode(true);
		const view = render(
			<DropdownList selected={0}>
				{options}
			</DropdownList>
		);
		settle(view);

		fireEvent.focus(screen.getByTestId('option-2'));
		VirtualList.scrollTo.mockClear();

		view.rerender(
			<DropdownList selected={0}>
				{changedOptions}
			</DropdownList>
		);

		expect(VirtualList.scrollTo).toHaveBeenCalledWith(expect.objectContaining({
			focus: true,
			index: 0
		}));
		expect(VirtualList.scrollTo).not.toHaveBeenCalledWith(expect.objectContaining({
			index: 2
		}));
	});

	test('should ignore focus when the fragment cannot report containment', () => {
		const probe = createRef();
		const utils = render(<Fragment ref={probe}><span /></Fragment>);
		const fragmentPrototype = Object.getPrototypeOf(probe.current);
		const originalCompare = fragmentPrototype.compareDocumentPosition;
		delete fragmentPrototype.compareDocumentPosition;
		utils.unmount();

		Spotlight.setPointerMode(false);

		try {
			const view = render(
				<DropdownList selected={0}>
					{options}
				</DropdownList>
			);
			settle(view);

			fireEvent.focus(screen.getByTestId('option-2'));
			VirtualList.scrollTo.mockClear();

			view.rerender(
				<DropdownList selected={0}>
					{changedOptions}
				</DropdownList>
			);

			expect(VirtualList.scrollTo).toHaveBeenCalledWith(expect.objectContaining({
				focus: true,
				index: 0
			}));
			expect(VirtualList.scrollTo).not.toHaveBeenCalledWith(expect.objectContaining({
				index: 2
			}));
		} finally {
			fragmentPrototype.compareDocumentPosition = originalCompare;
		}
	});
});
