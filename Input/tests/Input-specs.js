import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../Input';

const isPaused = () => Spotlight.isPaused() ? 'paused' : 'not paused';

describe('Input Specs', () => {
	test('should have an input element', () => {
		render(<Input />);

		const expected = 'INPUT';
		const actual = screen.getByLabelText('Input field').lastElementChild.tagName;

		expect(actual).toBe(expected);
	});

	test('should include a placeholder if specified', () => {
		const placeholder = 'hello';
		render(<Input placeholder={placeholder} />);

		const expected = 'placeholder';
		const actual = screen.getByLabelText('hello Input field').children[0];

		expect(actual).toHaveAttribute(expected, placeholder);
	});

	test('should have size large by default', () => {
		render(<Input />);

		const expected = 'large';
		const actual = screen.getByLabelText('Input field');

		expect(actual).toHaveClass(expected);
	});

	test('should have size small when size prop equals "small"', () => {
		render(<Input size="small" />);

		const expected = 'small';
		const actual = screen.getByLabelText('Input field');

		expect(actual).toHaveClass(expected);
	});

	test('should support iconAfter', () => {
		render(<Input iconAfter="0x0F0014" />);

		const expected = 983060; // // decimal converted charCode of `happyface` character
		const actual = screen.getByLabelText('Input field').children[1].textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support iconBefore', () => {
		render(<Input iconBefore="0x0F0014" />);

		const expected = 983060; // // decimal converted charCode of `happyface` character
		const actual = screen.getByLabelText('Input field').children[0].textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should have icon size large by default', () => {
		render(<Input iconAfter="happyface" />);

		const expected = 'large';
		const actual = screen.getByLabelText('Input field').children[1];

		expect(actual).toHaveClass(expected);
	});

	test('should set icon size to small when size equals small', () => {
		render(<Input iconAfter="happyface" size="small" />);

		const expected = 'small';
		const actual = screen.getByLabelText('Input field').children[1];

		expect(actual).toHaveClass(expected);
	});

	test('should callback onChange when the text changes', () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {target: {value: value}};
		render(<Input onChange={handleChange} />);
		const input = screen.getByLabelText('Input field').lastElementChild;

		fireEvent.change(input, evt);

		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(value);
	});

	test('should forward an event with a stopPropagation method from onChange handler', () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {
			target: {value: value},
			stopPropagation: jest.fn()
		};

		render(<Input onChange={handleChange} />);
		const inputField = screen.getByLabelText('Input field').children[0];

		fireEvent.change(inputField, evt);

		const actual = typeof handleChange.mock.calls[0][0].stopPropagation === 'function';

		expect(actual).toBeTruthy();
	});

	test('should not bubble the native event when stopPropagation from onChange is called', () => {
		const handleChange = jest.fn();
		const value = 'smt';
		function stop (ev) {
			ev.stopPropagation();
		}

		render(
			<div onChange={handleChange}>
				<Input onChange={stop} />
			</div>
		);
		const inputText = screen.getByLabelText('Input field').children[0];

		userEvent.type(inputText, value);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should callback onBeforeChange before the text changes', () => {
		const handleBeforeChange = jest.fn();
		const value = 'blah';
		render(<Input onBeforeChange={handleBeforeChange} />);
		const inputText = screen.getByLabelText('Input field').children[0];

		userEvent.type(inputText, value);

		expect(handleBeforeChange).toHaveBeenCalled();
	});

	test('should prevent onChange if onBeforeChange prevents', () => {
		const handleBeforeChange = jest.fn(ev => ev.preventDefault());
		const handleChange = jest.fn();
		const value = 'blah';
		render(<Input onBeforeChange={handleBeforeChange} onChange={handleChange} />);
		const inputText = screen.getByLabelText('Input field').children[0];

		userEvent.type(inputText, value);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should blur input on enter if dismissOnEnter', () => {
		const handleChange = jest.fn();
		render(<Input onBlur={handleChange} dismissOnEnter />);
		const inputText = screen.getByLabelText('Input field').children[0];

		fireEvent.mouseDown(inputText);
		fireEvent.keyUp(inputText, {which: 13, keyCode: 13, code: 13});

		expect(handleChange).toHaveBeenCalled();
	});

	test('should activate input on enter', () => {
		const handleChange = jest.fn();
		render(<Input onActivate={handleChange} />);
		const inputText = screen.getByLabelText('Input field').children[0];

		fireEvent.keyDown(inputText, {which: 13, keyCode: 13, code: 13});
		fireEvent.keyUp(inputText, {which: 13, keyCode: 13, code: 13});

		expect(handleChange).toHaveBeenCalled();
	});

	test('should not activate input on enter when disabled', () => {
		const handleChange = jest.fn();
		render(<Input disabled onActivate={handleChange} />);
		const inputText = screen.getByLabelText('Input field').children[0];

		fireEvent.keyDown(inputText, {which: 13, keyCode: 13, code: 13});
		fireEvent.keyUp(inputText, {which: 13, keyCode: 13, code: 13});

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should be able to be disabled', () => {
		render(<Input disabled />);

		const actual = screen.getByLabelText('Input field');
		const expected = 'disabled';

		expect(actual).toHaveAttribute(expected);
	});

	test('should reflect the value if specified', () => {
		render(<Input value="hello" />);

		const actual = screen.getByLabelText('hello Input field').children[0];
		const expected = 'hello';

		expect(actual).toHaveAttribute('value', expected);
	});

	test('should have dir equal to rtl when there is rtl text', () => {
		render(<Input value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />);
		const inputField = screen.getByLabelText( 'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי' + ' Input field').children[0];

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is ltr text', () => {
		render(<Input value="content" />);
		const inputField = screen.getByLabelText('content Input field').children[0];

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to rtl when there is rtl text in the placeholder', () => {
		render(<Input placeholder="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />);
		const inputField = screen.getByLabelText('שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי' + ' Input field').children[0];

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is ltr text in the placeholder', () => {
		render(<Input placeholder="content" />);
		const inputField = screen.getByLabelText('content Input field').children[0];

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to rtl when there is ltr text in the placeholder, but rtl text in value', () => {
		render(<Input placeholder="content" value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />);
		const inputField = screen.getByLabelText('שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי' + ' Input field').children[0];

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is rtl text in the placeholder, but ltr text in value', () => {
		render(<Input placeholder="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" value="content" />);
		const inputField = screen.getByLabelText('content Input field').children[0];

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should pause spotlight when input has focus', () => {
		render(<Input />);
		const inputField = screen.getByLabelText('Input field').children[0];

		fireEvent.mouseDown(inputField);

		const expected = 'paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should resume spotlight on unmount', () => {
		const {unmount} = render(<Input />);
		const inputField = screen.getByLabelText('Input field').children[0];

		fireEvent.mouseDown(inputField);

		unmount();

		const expected = 'not paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should display invalid message if it invalid and invalid message exists', () => {
		render(<Input invalid invalidMessage="invalid message" />);
		const actual = screen.getByText('invalid message');

		const expected = 'tooltipLabel';

		expect(actual).toHaveClass(expected);
	});

	test('should not display invalid message if it is valid', () => {
		render(<Input invalidMessage="invalid message" />);

		const actual = screen.queryByText('invalid message');

		expect(actual).toBeNull();
	});

	test('should support clearButton', () => {
		render(<Input clearButton />);

		const expected = 983097; // decimal converted charCode of character
		const actual = screen.getByLabelText('Input field').children[1].textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support custom icon for clearButton', () => {
		render(<Input clearButton clearIcon="0x0F0014" />);

		const expected = 983060; // decimal converted charCode of character
		const actual = screen.getByLabelText('Input field').children[1].textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should clear input value when clearButton is clicked', async () => {
		render(<Input clearButton value="Hello Input" />);

		const clearButton = screen.getByLabelText('Hello Input Input field').children[1];
		const input = screen.getByLabelText('Hello Input Input field').children[0];

		userEvent.click(clearButton);

		const expectedValue = '';

		setTimeout(() => expect(input).toHaveAttribute('value', expectedValue), 100);
		// setTimeout is used here to give input some time to clear its value
	});

	test('should not clear input value when disabled', () => {
		const value = 'Hello Input';
		render(<Input clearButton disabled value={value} />);

		const clearButton = screen.getByLabelText('Hello Input Input field').children[1];
		const input = screen.getByLabelText('Hello Input Input field').children[0];

		userEvent.click(clearButton);

		const expectedValue = value;

		setTimeout(() => expect(input).toHaveAttribute('value', expectedValue), 100);
		// setTimeout is used here to give input some time to clear its value
	});
});
