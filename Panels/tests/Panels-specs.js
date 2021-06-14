import {mount} from 'enzyme';

import Button from '../../Button';
import Header from '../../Header';
import Panel from '../Panel';
import Panels, {PanelsBase} from '../Panels';

describe('Panels Specs', () => {
	test(
		'should set {autoFocus} on child to "default-element" on first render',
		() => {
			const DivPanel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<DivPanel />
				</Panels>
			);

			const expected = 'default-element';
			const actual = panels.find('DivPanel').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set {autoFocus} on child to "default-element" when navigating to a higher index',
		() => {
			const DivPanel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<DivPanel />
					<DivPanel id="p2" />
				</Panels>
			);

			panels.setProps({
				index: 1
			});

			const expected = 'default-element';
			const actual = panels.find('DivPanel#p2').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not set {autoFocus} on child when navigating to a higher index when it has an autoFocus prop set',
		() => {
			const DivPanel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<DivPanel />
					<DivPanel id="p2" autoFocus="last-focused" />
				</Panels>
			);

			panels.setProps({
				index: 1
			});

			const expected = 'last-focused';
			const actual = panels.find('DivPanel#p2').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	describe('with Panel and Header', () => {
		test(
			'should render close button',
			() => {
				const panels = mount(
					<Panels index={0}>
						<Panel>
							<Header title="Panel Title" />
						</Panel>
					</Panels>
				);

				const closeButton = panels.find('Controls').find('Button');
				const expected = 1;
				const actual = closeButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should not render close button when \'noCloseButton\' is set to true',
			() => {
				const panels = mount(
					<Panels index={0} noCloseButton>
						<Panel>
							<Header title="Panel Title" />
						</Panel>
					</Panels>
				);

				const backButton = panels.find('Controls').find('Button');
				const expected = 0;
				const actual = backButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set close button "aria-label" to closeButtonAriaLabel',
			() => {
				const label = 'custom close button label';
				const panels = mount(
					<Panels closeButtonAriaLabel={label} index={0}>
						<Panel>
							<Header title="Panel Title" />
						</Panel>
					</Panels>
				);

				const expected = label;
				const actual = panels.find('Controls').find('Button').prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should insert additional Panels-level buttons into the global-navigation area when declaring controls prop',
			() => {
				const panels = mount(
					<Panels
						controls={<Button id="controlButtonTest">Control button</Button>}
						index={0}
					>
						<Panel>
							<Header title="Panel Title" />
						</Panel>
					</Panels>
				);

				const controlButton = panels.find('Controls').find('Button#controlButtonTest');

				const expected = 1;
				const actual = controlButton.length;

				expect(actual).toBe(expected);
			}
		);
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
