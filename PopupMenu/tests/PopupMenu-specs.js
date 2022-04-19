import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {PopupMenu} from '../PopupMenu';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('PopupMenu specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<PopupMenu open><div>popupMenu</div></PopupMenu>
			</FloatingLayerController>
		);

		const popupMenu = screen.getByText('popupMenu');

		expect(popupMenu).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<PopupMenu open={false}><div>popupMenu</div></PopupMenu>
			</FloatingLayerController>
		);

		const popup = screen.queryByText('popupMenu');

		expect(popup).toBeNull();
	});

	test('should display correct title', () => {
		const title = 'This is a Popupmenu title';
		render(
			<FloatingLayerController>
				<PopupMenu open title={title} />
			</FloatingLayerController>
		);

		const popupMenuTitle = screen.getByText(title);

		expect(popupMenuTitle).toBeInTheDocument();

		const expected = 'popupMenuTitle';
		const popupMenuTitleElement = screen.getByRole('alert').children.item(0);

		expect(popupMenuTitleElement).toHaveClass(expected);
	});

	test('should apply \'shown\' class when visible with noAnimation', () => {
		render(
			<FloatingLayerController>
				<PopupMenu noAnimation open />
			</FloatingLayerController>
		);

		const expected = 'shown';
		const actual = screen.getByRole('alert').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should apply \'ease-in-out\' class when noAnimation is false', () => {
		render(
			<FloatingLayerController>
				<PopupMenu noAnimation={false} open />
			</FloatingLayerController>
		);

		const expected = 'ease-in-out';
		const actual = screen.getByRole('alert').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have orientation=horizontal when no orientation is specified', () => {
		render(
			<FloatingLayerController>
				<PopupMenu open />
			</FloatingLayerController>
		);

		const expected = 'horizontal';
		const popupMenu = screen.getByRole('alert');

		expect(popupMenu).toHaveClass(expected);
	});
});
