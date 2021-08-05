import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Drawer, DrawerBase} from '../Drawer';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Drawer specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<Drawer open>
					Hello!
				</Drawer>
			</FloatingLayerController>
		);
		const drawer = screen.getByText('Hello!');

		expect(drawer).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<Drawer open={false}>
					Hello!
				</Drawer>
			</FloatingLayerController>
		);
		const drawer = screen.queryByRole('Hello!');

		expect(drawer).toBeNull();
	});

	test('should apply `shown` class when visible', () => {
		render(
			<FloatingLayerController>
				<DrawerBase open />
			</FloatingLayerController>
		);
		const drawerBase = screen.getByRole('alert').parentElement.parentElement;

		const expected = 'shown';
		screen.debug();

		expect(drawerBase).toHaveClass(expected);
	});

	test('should apply `ease-in-out` class when noAnimation is false', () => {
		render(
			<FloatingLayerController>
				<DrawerBase noAnimation={false} open />
			</FloatingLayerController>
		);
		const drawerBase = screen.getByRole('alert').parentElement.parentElement;

		const expected = 'ease-in-out';
		screen.debug();

		expect(drawerBase).toHaveClass(expected);
	});
});
