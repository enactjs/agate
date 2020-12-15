import React from 'react';
import {mount} from 'enzyme';

import Header from '../../Header';
import Panel from '../Panel';
import Panels from '../Panels';

describe('Panels Specs', () => {
	test(
		'should set {autoFocus} on child to "default-element" on first render',
		() => {
			// eslint-disable-next-line enact/prop-types
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
			// eslint-disable-next-line enact/prop-types
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
			// eslint-disable-next-line enact/prop-types
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
	});
});
