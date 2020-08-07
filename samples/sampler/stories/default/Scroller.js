import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import ri from '@enact/ui/resolution';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import {storiesOf} from '@storybook/react';

import BodyText from '@enact/agate/BodyText';
import Scroller from '@enact/agate/Scroller';

const prop = {
	direction: ['both', 'horizontal', 'vertical'],
	focusableScrollbarOption: {
		false: false,
		true: true,
		'&quot;byEnter&quot;': 'byEnter'
	},
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate']
};

const ScrollerConfig = mergeComponentMetadata('Scroller', UiScrollerBasic, Scroller);

storiesOf('Agate', module)
	.add(
		'Scroller',
		() => (
			<Scroller
				direction={select('direction', prop.direction, ScrollerConfig)}
				focusableScrollbar={boolean('focusableScrollbar', ScrollerConfig)}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, ScrollerConfig)}
				key={select('scrollMode', prop.scrollModeOption, ScrollerConfig)}
				noScrollByWheel={boolean('noScrollByWheel', ScrollerConfig)}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, ScrollerConfig)}
				spotlightDisabled={boolean('spotlightDisabled', ScrollerConfig, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, ScrollerConfig)}
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
		),
		{
			info: {
				text: 'Basic usage of Scroller'
			}
		}
	);
