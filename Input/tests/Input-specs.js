import React from 'react';
import {mount} from 'enzyme';
import Input from '../Input';

describe('Input Specs', () => {
	test('should have an input element', () => {
		const subject = mount(
			<Input />
		);
		expect(subject.find('input')).toHaveLength(1);
	});

	test('should include a placeholder if specified', () => {
		const subject = mount(
			<Input placeholder="hello" />
		);

		expect(subject.find('input').prop('placeholder')).toBe('hello');
	});

	test('should callback onChange when the text changes', () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {target: {value: value}};
		const subject = mount(
			<Input onChange={handleChange} />
		);

		subject.find('input').simulate('change', evt);

		const expected = value;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should be able to be disabled', () => {
		const subject = mount(
			<Input disabled />
		);

		expect(subject.find('input').prop('disabled')).toBe(true);
	});

	test('should reflect the value if specified', () => {
		const subject = mount(
			<Input value="hello" />
		);

		expect(subject.find('input').prop('value')).toBe('hello');
	});

});
