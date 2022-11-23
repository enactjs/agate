import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Button from '../../Button';
import Header from '../../Header';
import Panel from '../Panel';
import Panels, {PanelsBase} from '../Panels';

describe('Panels Specs', () => {
	test('should set {autoFocus} on child to \'default-element\' on first render', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		render(
			<Panels index={0}>
				<DivPanel />
			</Panels>
		);

		const expected = 'default-element';
		const actual = screen.getByTestId('panel').textContent;

		expect(actual).toBe(expected);
	});

	test('should set {autoFocus} on child to \'default-element\' when navigating to a higher index', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		const {rerender} = render(
			<Panels index={0}>
				<DivPanel />
				<DivPanel id="p2" />
			</Panels>
		);

		rerender(
			<Panels index={1}>
				<DivPanel />
				<DivPanel id="p2" />
			</Panels>
		);

		const expected = 'default-element';
		const actual = screen.getAllByTestId('panel')[0].textContent;

		expect(actual).toBe(expected);
	});

	test('should not set {autoFocus} on child when navigating to a higher index when it has an autoFocus prop set', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		const {rerender} = render(
			<Panels index={0}>
				<DivPanel />
				<DivPanel autoFocus="last-focused" id="p2" />
			</Panels>
		);

		rerender(
			<Panels index={1}>
				<DivPanel />
				<DivPanel autoFocus="last-focused" id="p2" />
			</Panels>
		);

		const expected = 'last-focused';
		const panel = screen.getAllByTestId('panel')[0];

		expect(panel.textContent).toBe(expected);
		expect(panel.id).toBe('p2');
	});

	test('should set custom autoFocus on child panels', () => {
		const DivPanel = ({autoFocus, id}) => <Panel autoFocus={autoFocus} data-testid="panel" id={id}>{autoFocus}</Panel>;
		render(
			<Panels index={0}>
				<DivPanel autoFocus="focus-here" id="p2" />
			</Panels>
		);

		const expected = 'focus-here';
		const panel = screen.getByTestId('panel');

		expect(panel.textContent).toBe(expected);
		expect(panel.id).toBe('p2');
	});

	test('should call \'onBack\' for \'escape\' key if not on first panel', () => {
		const spy = jest.fn();
		render(
			<Panels onBack={spy} data-testid="panels" index={1}>
				<Panel>First</Panel>
				<Panel>Second</Panel>
			</Panels>
		)

		const panels = screen.getByTestId('panels');

		fireEvent.keyDown(panels, {keyCode: 27});
		fireEvent.keyUp(panels, {keyCode: 27});

		expect(spy).toHaveBeenCalled();
	});

	test('should not call \'onScroll\' for a scroll event applied to a child', () => {
		const spy = jest.fn();

		render(
			<Panels onScroll={spy} index={0}>
				<Panel data-testid="panel">First</Panel>
				<Panel>Second</Panel>
			</Panels>
		)

		const panel = screen.getByTestId('panel');
		fireEvent.scroll(panel, { target: { scrollY: 100 } });

		expect(spy).not.toHaveBeenCalled();
	});

	describe('with Panel and Header', () => {
		test('should render close button', () => {
			render(
				<Panels index={0}>
					<Panel>
						<Header title="Panel Title" />
					</Panel>
				</Panels>
			);

			const closeButton = screen.getByRole('button');

			expect(closeButton).toBeInTheDocument();
		});

		test('should not render close button when \'noCloseButton\' is set to true', () => {
			render(
				<Panels index={0} noCloseButton>
					<Panel>
						<Header title="Panel Title" />
					</Panel>
				</Panels>
			);

			const closeButton = screen.queryByRole('button');

			expect(closeButton).toBeNull();
		});

		test('should set close button \'aria-label\' to closeButtonAriaLabel', () => {
			const label = 'custom close button label';
			render(
				<Panels closeButtonAriaLabel={label} index={0}>
					<Panel>
						<Header title="Panel Title" />
					</Panel>
				</Panels>
			);

			const expected = label;
			const actual = screen.getByRole('button');

			expect(actual).toHaveAttribute('aria-label', expected);
		});

		test('should insert additional Panels-level buttons into the global-navigation area when declaring controls prop', () => {
			render(
				<Panels
					controls={<Button data-testid="controlButtonTest">Control button</Button>}
					index={0}
				>
					<Panel>
						<Header title="Panel Title" />
					</Panel>
				</Panels>
			);

			const controlButton = screen.getByTestId('controlButtonTest');

			expect(controlButton).toBeInTheDocument();
		});
	});

	describe('childProps', () => {
		test('should not add aria-owns when noCloseButton is true and no controls', () => {
			const id = 'id';
			const childProps = {};
			const props = {
				childProps,
				noCloseButton: true,
				id
			};

			const expected = childProps;
			const actual = PanelsBase.computed.childProps(props);

			expect(actual).toBe(expected);
		});

		test('should not add aria-owns when id is not set', () => {
			const childProps = {};
			const props = {
				childProps,
				noCloseButton: false
			};

			const expected = childProps;
			const actual = PanelsBase.computed.childProps(props);

			expect(actual).toBe(expected);
		});

		test('should add aria-owns', () => {
			const id = 'id';
			const childProps = {};
			const props = {
				childProps,
				noCloseButton: false,
				id
			};

			const expected = `${id}-controls`;
			const actual = PanelsBase.computed.childProps(props)['aria-owns'];

			expect(actual).toBe(expected);
		});

		test('should append aria-owns', () => {
			const id = 'id';
			const ariaOwns = ':allthethings:';
			const childProps = {
				'aria-owns': ariaOwns
			};
			const props = {
				childProps,
				noCloseButton: false,
				id
			};

			const expected = `${ariaOwns} ${id}-controls`;
			const actual = PanelsBase.computed.childProps(props)['aria-owns'];

			expect(actual).toBe(expected);
		});

		test('should append aria-owns with noCloseButton and controls', () => {
			const id = 'id';
			const ariaOwns = ':allthethings:';
			const childProps = {
				'aria-owns': ariaOwns
			};
			const props = {
				childProps,
				controls: <div>Hello</div>,
				noCloseButton: true,
				id
			};

			const expected = `${ariaOwns} ${id}-controls`;
			const actual = PanelsBase.computed.childProps(props)['aria-owns'];

			expect(actual).toBe(expected);
		});
	});
});
