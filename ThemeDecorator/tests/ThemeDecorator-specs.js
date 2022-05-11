import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ThemeDecorator from '../';
import Spotlight from '@enact/spotlight';

describe('ThemeDecorator', () => {
	const AppRoot = (props) => <div id="app" {...props} />;

	test('should add base gallium classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		render(<App data-testid="themeDecorator" />);

		Spotlight.terminate();

		const expected = 'gallium';
		const appRoot = screen.getByTestId('themeDecorator');

		expect(appRoot).toHaveClass(expected);
	});

	test('should add author classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		render(<App className="author-class" data-testid="themeDecorator" />);

		Spotlight.terminate();

		const expected = 'author-class';
		const appRoot = screen.getByTestId('themeDecorator');

		expect(appRoot).toHaveClass(expected);
	});

	test('should not add .agate class to wrapped component when float is enabled', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: true, overlay: false};
		const App = ThemeDecorator(config, AppRoot);
		render(<App data-testid="themeDecorator" />);

		Spotlight.terminate();

		const expected = 'agate';
		const appRoot = screen.getByTestId('themeDecorator');

		expect(appRoot).not.toHaveClass(expected);
	});

	test('should not add .bg class to wrapped component when overlay is enabled', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: true};
		const App = ThemeDecorator(config, AppRoot);
		render(<App data-testid="themeDecorator" />);

		Spotlight.terminate();

		const expected = 'bg';
		const appRoot = screen.getByTestId('themeDecorator');

		expect(appRoot).not.toHaveClass(expected);
	});
});
