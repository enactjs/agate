import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import BreadcrumbPanels from '../BreadcrumbPanels';
import Panel from '../Panel';

describe('BreadcrumbPanels Specs', () => {
	test('should render content properly inside panel', () => {
		render(
			<BreadcrumbPanels>
				<Panel>
					<div>Panel content</div>
				</Panel>
			</BreadcrumbPanels>
		);

		const panel = screen.getByText('Panel content');

		expect(panel).toBeInTheDocument();
	});

	test('should set {autoFocus} on child to \'default-element\' when navigating to a higher index', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		const {rerender} = render(
			<BreadcrumbPanels index={0}>
				<DivPanel />
				<DivPanel id="p2" />
			</BreadcrumbPanels>
		);

		rerender(
			<BreadcrumbPanels index={1}>
				<DivPanel />
				<DivPanel id="p2" />
			</BreadcrumbPanels>
		);

		const expected = 'default-element';
		const actual = screen.getAllByTestId('panel')[0].textContent;

		expect(actual).toBe(expected);
	});
});
