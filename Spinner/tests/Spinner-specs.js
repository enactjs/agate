import {mount} from 'enzyme';
import React from 'react';

import Spinner from '../Spinner';

import css from '../Spinner.module.less';

describe('Spinner Specs', () => {
	test('should have transparentBackground class when transparent prop equals true', () => {
		const subject = mount(
			<Spinner transparent />
		);

		const expected = true;
		const actual = subject.find('SpinnerCore').hasClass(css.transparentBackground);

		expect(actual).toBe(expected);
	});

	test('should center the Spinner when centered prop equals true', () => {
		const subject = mount(
			<Spinner centered />
		);

		const expected = 'centered';
		const actual = subject.find('SpinnerCore').prop('className');

		expect(actual).toContain(expected);
	});

	test('should have pausedAnimation class when paused prop equals true', () => {
		const subject = mount(
			<Spinner paused />
		);

		const expected = true;
		const actual = subject.find('SpinnerCore').hasClass(css.pausedAnimation);

		expect(actual).toBe(expected);
	});

	test('should have loading class when type prop equals `loading`', () => {
		const subject = mount(
			<Spinner type="loading" />
		);

		const expected = 'loading';
		const actual = subject.find('SpinnerCore').prop('type');

		expect(actual).toBe(expected);
	});

	test('should have smallest class when size prop equals `smallest`', () => {
		const subject = mount(
			<Spinner size="smallest" />
		);

		const expected = 'smallest';
		const actual = subject.find('SpinnerCore').prop('className');

		expect(actual).toContain(expected);
	});

	test('should have small class when size prop equals `small`', () => {
		const subject = mount(
			<Spinner size="small" />
		);

		const expected = 'small';
		const actual = subject.find('SpinnerCore').prop('className');

		expect(actual).toContain(expected);
	});

	test('should have large class by default', () => {
		const subject = mount(
			<Spinner />
		);

		const expected = 'large';
		const actual = subject.find('SpinnerCore').prop('className');

		expect(actual).toContain(expected);
	});

	test('should have huge class when size prop equals `huge`', () => {
		const subject = mount(
			<Spinner size="huge" />
		);

		const expected = 'huge';
		const actual = subject.find('SpinnerCore').prop('className');

		expect(actual).toContain(expected);
	});

	test('should have dark class when color prop equals `dark`', () => {
		const subject = mount(
			<Spinner color="dark" />
		);

		const expected = 'dark';
		const actual = subject.find('SpinnerCore').prop('className');

		expect(actual).toContain(expected);
	});

	test('should set role to alert by default', () => {
		const subject = mount(
			<Spinner />
		);

		const expected = 'alert';
		const actual = subject.find(`div.${css.spinner}`).prop('role');

		expect(actual).toBe(expected);
	});

	test('should set aria-live to off by default', () => {
		const subject = mount(
			<Spinner />
		);

		const expected = 'off';
		const actual = subject.find(`div.${css.spinner}`).prop('aria-live');

		expect(actual).toBe(expected);
	});

	test(
		'should not have client node when Spinner has no children',
		() => {
			const spinner = mount(
				<Spinner />
			);

			const expected = false;
			const actual = spinner.find(`div.${css.client}`).exists();

			expect(actual).toBe(expected);
		}
	);

	test('should have a client node when Spinner has children', () => {
		const spinner = mount(
			<Spinner>
				Loading...
			</Spinner>
		);

		const expected = true;
		const actual = spinner.find(`div.${css.client}`).exists();

		expect(actual).toBe(expected);
	});

	test('should have content class when Spinner has children', () => {
		const spinner = mount(
			<Spinner>
				Loading...
			</Spinner>
		);

		const expected = true;
		const actual = spinner.find(`div.${css.spinner}`).hasClass(css.content);

		expect(actual).toBe(expected);
	});
});
