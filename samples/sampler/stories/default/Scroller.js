import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import BodyText from '@enact/agate/BodyText';
import Scroller from '@enact/agate/Scroller';

const prop = {
	direction: ['both', 'horizontal', 'vertical'],
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate']
};

Scroller.displayName = 'Scroller';
const ScrollerConfig = mergeComponentMetadata('Scroller', UiScrollerBasic, Scroller);

export default {
	title: 'Agate/Scroller',
	component: 'Scroller'
};

export const _Scroller = (args) => (
	<Scroller
		direction={args['direction']}
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		key={args['scrollMode']}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		scrollMode={args['scrollMode']}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
	>
		<div
			style={{
				height: ri.scaleToRem(2004),
				width: ri.scaleToRem(4002)
			}}
		>
			<BodyText>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
			</BodyText>
			<div
				style={{
					marginTop: ri.scaleToRem(1602)
				}}
			>
				<BodyText>
					Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
				</BodyText>
			</div>
		</div>
	</Scroller>
);
select('direction', _Scroller, prop.direction, ScrollerConfig);
boolean('focusableScrollbar', _Scroller, ScrollerConfig);
select('horizontalScrollbar', _Scroller, prop.scrollbarOption, ScrollerConfig);
select('scrollMode', _Scroller, prop.scrollModeOption, ScrollerConfig);
boolean('spotlightDisabled', _Scroller, ScrollerConfig, false);
select('verticalScrollbar', _Scroller, prop.scrollbarOption, ScrollerConfig);
_Scroller.storyName = 'Scroller';
_Scroller.parameters = {
	info: {
		text: 'Basic usage of Scroller'
	},
	props: {
		noScroller: true
	}
};
