import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Panel from '../Panel';
import TabbedPanels from '../TabbedPanels';

describe('TabbedPanels Specs', () => {
	test('should render tabs properly', () => {
		render(
			<TabbedPanels
				orientation={'vertical'}
				tabs={[
					{title: 'Panel1', icon: 'netbook'},
					{title: 'Panel2', icon: 'aircirculation'}
				]}
			>
				<Panel>Hello Panel 1</Panel>
				<Panel>Hello Panel 2</Panel>
			</TabbedPanels>
		);

		const firstTab = screen.getByText('Panel1');
		const secondTab = screen.getByText('Panel2');

		expect(firstTab).toBeInTheDocument();
		expect(secondTab).toBeInTheDocument();
	});

	test('should call \'onSelect\' when selecting another tab', () => {
		const spy = jest.fn();
		render(
			<TabbedPanels
				onSelect={spy}
				orientation={'vertical'}
				tabs={[
					{title: 'Panel1', icon: 'netbook'},
					{title: 'Panel2', icon: 'aircirculation'}
				]}
			>
				<Panel>Hello Panel 1</Panel>
				<Panel>Hello Panel 2</Panel>
			</TabbedPanels>
		);

		const secondTab = screen.getByText('Panel2');
		userEvent.click(secondTab);

		expect(spy).toHaveBeenCalled();
	});

	test('should get content from tabs if there are no children', () => {
		render(
			<TabbedPanels
				orientation={'vertical'}
				tabs={[
					{title: 'Panel1', icon: 'netbook', view: Panel, viewProps:{children: 'Panel 1'}}
				]}
			/>
		);

		const panel = screen.getByText('Panel 1');

		expect(panel).toBeInTheDocument();
	});
});
