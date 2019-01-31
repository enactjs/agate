import React from 'react';
import {mount} from 'enzyme';
import AgateDecorator from '../';
import Spotlight from '@enact/spotlight';

import css from '../AgateDecorator.module.less';

describe('AgateDecorator', () => {

	const AppRoot = (props) => <app {...props} />;

	it('should add base carbon classes to wrapped component', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = AgateDecorator(config, AppRoot);
		const subject = mount(
			<App />
		);

		Spotlight.terminate();

		const appRoot = subject.find('app');

		const expected = true;
		const actual = appRoot.hasClass('carbon');

		expect(actual).to.equal(expected);
	});

	it('should add author classes to wrapped component', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = AgateDecorator(config, AppRoot);
		const subject = mount(
			<App className="author-class" />
		);

		Spotlight.terminate();

		const appRoot = subject.find('app');

		const expected = true;
		const actual = appRoot.hasClass('author-class');

		expect(actual).to.equal(expected);
	});

	it('should not add .agate class to wrapped component when float is enabled', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: true, overlay: false};
		const App = AgateDecorator(config, AppRoot);
		const subject = mount(
			<App />
		);

		Spotlight.terminate();

		const appRoot = subject.find('app');

		const expected = false;
		const actual = appRoot.hasClass('agate');

		expect(actual).to.equal(expected);
	});

	it('should not add .bg class to wrapped component when overlay is enabled', function () {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: true};
		const App = AgateDecorator(config, AppRoot);
		const subject = mount(
			<App />
		);

		Spotlight.terminate();

		const appRoot = subject.find('app');

		const expected = false;
		const actual = appRoot.hasClass(css.bg);

		expect(actual).to.equal(expected);
	});

});
