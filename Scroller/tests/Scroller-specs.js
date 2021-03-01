import {mount} from 'enzyme';
import Scroller from '../Scroller';

describe('Scroller', () => {
	let contents;

	beforeEach(() => {
		contents = (
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
			</div>
		);
	});

	afterEach(() => {
		contents = null;
	});

	describe('Scrollbar visibility', () => {
		test(
			'should render both horizontal and vertical scrollbars when \'horizontalScrollbar\' and \'verticalScrollbar\' are "visible"',
			() => {
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = 2;
				const actual = subject.find('Scrollbar').length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is "hidden"',
			() => {
				const subject = mount(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = 1;
				const actual = subject.find('Scrollbar').length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should not render any scrollbar when when \'horizontalScrollbar\' and \'verticalScrollbar\' are "hidden"',
			() => {
				const subject = mount(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						{contents}
					</Scroller>
				);

				const expected = 0;
				const actual = subject.find('Scrollbar').length;

				expect(actual).toBe(expected);
			}
		);
	});

	describe('Scrollbar accessibility', () => {
		test(
			'should set a custom "aria-label" to the up scroll button in the vertical scrollbar',
			() => {
				const label = 'custom button aria label';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollUpAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(0).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set a custom "aria-label" to the down scroll button in the vertical scrollbar',
			() => {
				const label = 'custom button aria label';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollDownAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(1).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set a custom "aria-label" to the left scroll button in the horizontal scrollbar',
			() => {
				const label = 'custom button aria label';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollLeftAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(2).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set a custom "aria-label" to the right scroll button in the horizontal scrollbar',
			() => {
				const label = 'custom button aria label';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollRightAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(3).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set a null string "aria-label" to the up scroll button in the vertical scrollbar',
			() => {
				const label = '';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollUpAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(0).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set a null string "aria-label" to the down scroll button in the vertical scrollbar',
			() => {
				const label = '';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollDownAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(1).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set a null string "aria-label" to the left scroll button in the horizontal scrollbar',
			() => {
				const label = '';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollLeftAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(2).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set a null string "aria-label" to the right scroll button in the horizontal scrollbar',
			() => {
				const label = '';
				const subject = mount(
					<Scroller
						horizontalScrollbar="visible"
						scrollRightAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const expected = label;
				const actual = subject.find('ScrollButton').at(3).prop('aria-label');

				expect(actual).toBe(expected);
			}
		);
	});
});
