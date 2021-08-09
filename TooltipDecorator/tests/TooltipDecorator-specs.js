import {FloatingLayerBase, FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Tooltip} from '../Tooltip';
import TooltipLabel from '../TooltipLabel';

const Root = FloatingLayerDecorator('div');

describe('TooltipDecorator Specs', () => {
	test('should render component into FloatingLayer if open', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase data-testid="floatingLayer" open>
					<Tooltip>
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const expected = tooltipText;
		const actual = screen.getByTestId('floatingLayer');

		expect(actual).toHaveTextContent(expected);
	});

	test('should not render component into FloatingLayer if not open', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase data-testid="floatingLayer">
					<Tooltip>
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const actual = screen.queryByText(tooltipText);

		expect(actual).toBeNull();
	});

	test('should apply `text-align: center` style when `centered=true` and marquee=true', () => {
		render(
			<TooltipLabel centered marquee>
				Label
			</TooltipLabel>
		);

		const expected = 'center';
		const actual = screen.getByText('Label');

		expect(actual).toHaveStyle({'text-align': expected});
	});

	test('should not apply `text-align: center` style when `centered=false`', () => {
		render(
			<TooltipLabel centered={false}>
				Label
			</TooltipLabel>
		);

		const expected = 'center';
		const actual = screen.getByText('Label');

		expect(actual).not.toHaveStyle({'text-align': expected});
	});
});
