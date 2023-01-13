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
	test('should accept a function as `forwardRef` prop', () => {
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
