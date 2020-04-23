import React from 'react';
import {mount} from 'enzyme';
import ThemeDecorator from '../';
import Spotlight from '@enact/spotlight';

import css from '../ThemeDecorator.module.less';

describe('ThemeDecorator', () => {

	const AppRoot = (props) => <div id="app" {...props} />;

	test('should add base gallium classes to wrapped component', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		const subject = mount(
			<App />
		);

		Spotlight.terminate();

		const appRoot = subject.find('#app');

		const expected = true;
		const actual = appRoot.hasClass('gallium');

		expect(actual).toBe(expected);
	});

	test('should add author classes to wrapped component', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		const subject = mount(
			<App className="author-class" />
		);

		Spotlight.terminate();

		const appRoot = subject.find('#app');

		const expected = true;
		const actual = appRoot.hasClass('author-class');

		expect(actual).toBe(expected);
	});

	test('should not add .agate class to wrapped component when float is enabled', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: true, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		const subject = mount(
			<App />
		);

		Spotlight.terminate();

		const appRoot = subject.find('#app');

		const expected = false;
		const actual = appRoot.hasClass('agate');

		expect(actual).toBe(expected);
	});

	test('should not add .bg class to wrapped component when overlay is enabled', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: true};
		const App = ThemeDecorator(config, AppRoot);
		const subject = mount(
			<App />
		);

		Spotlight.terminate();

		const appRoot = subject.find('#app');

		const expected = false;
		const actual = appRoot.hasClass(css.bg);

		expect(actual).toBe(expected);
	});

});
