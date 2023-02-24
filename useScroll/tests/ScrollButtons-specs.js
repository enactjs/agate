import '@testing-library/jest-dom';
import {act, render, renderHook, screen} from '@testing-library/react';

import {ScrollButton} from '../ScrollButton';
import useScrollButtons from '../ScrollButtons';

const props = {
	focusableScrollButtons: 'false',
	nop: () => {},
	preventBubblingOnKeyDown: 'false',
	rtl: 'false',
	vertical: 'false'
};

describe('ScrollButton specs', () => {
	// ref property can't be accessed with react testing library. This test is only for increasing code coverage - [feature/WRP-3081]
	test('should accept a function as `ref` prop', () => {
		render(<ScrollButton icon="circle" ref={() => {}} />);

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
	});
});

describe('ScrollButtons specs', () => {
	test('should return `true` for `isOneOfScrollButtonsFocused`', () => {
		const functions = renderHook(() => useScrollButtons(props)).result.current;
		let aux;
		act(() => {
			aux = functions.isOneOfScrollButtonsFocused();

			// functions called in order to increase code coverage
			functions.focusOnButton();
			functions.onClickNext();
			functions.onClickPrev();
			functions.updateButtons({scrollLeft: 1, maxLeft: 0});
		});

		expect(aux).toBe(true);
	});
});
