import '@testing-library/jest-dom';
import {act, render, renderHook, screen} from '@testing-library/react';

import {ScrollButton} from '../ScrollButton';
import useScrollButtons from '../ScrollButtons';

const props = {
	vertical: 'false',
	focusableScrollButtons: 'false',
	nop: () => {},
	preventBubblingOnKeyDown: 'false',
	rtl: 'false'
};

describe('ScrollButton specs', () => {
	test('should accept a function as `forwardRef` prop', () => {
		render(<ScrollButton icon="circle" ref={() => {}} />);

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
	});
});

describe('ScrollButtons specs', () => {
	test('should run `updateButtons`', () => {
		const functions = renderHook(() => useScrollButtons(props)).result.current;
		act(() => {
			functions.updateButtons({scrollLeft: 1, maxLeft: 0});
		});
	});

	test('should return `true` for `isOneOfScrollButtonsFocused`', () => {
		const functions = renderHook(() => useScrollButtons(props)).result.current;
		let aux;
		act(() => {
			aux = functions.isOneOfScrollButtonsFocused();
		});

		expect(aux).toBe(true);
	});

	test('should run `onClickPrev`', () => {
		const functions = renderHook(() => useScrollButtons(props)).result.current;
		act(() => {
			functions.onClickPrev();
		});
	});

	test('should run `onClickNext`', () => {
		const functions = renderHook(() => useScrollButtons(props)).result.current;
		act(() => {
			functions.onClickNext();
		});
	});

	test('should run `focusOnButton`', () => {
		const functions = renderHook(() => useScrollButtons(props)).result.current;
		act(() => {
			functions.focusOnButton();
		});
	});
});
