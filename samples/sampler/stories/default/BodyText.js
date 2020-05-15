import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiBodyText from '@enact/ui/BodyText';
import React from 'react';
import {storiesOf} from '@storybook/react';

import BodyText, {BodyTextBase} from '@enact/agate/BodyText';

BodyText.displayName = 'BodyText';
const Config = mergeComponentMetadata('BodyText', UiBodyText, BodyText, BodyTextBase);

const prop = {
	sizes: ['', 'large', 'small']
};

storiesOf('Agate', module)
	.add(
		'BodyText',
		() => (
			<BodyText
				centered={boolean('centered', Config)}
				noWrap={boolean('noWrap', Config)}
				size={select('size', prop.sizes, Config)}
			>
				{text('children', BodyText, 'This is a body text')}
			</BodyText>
		),
		{
			text: 'The basic Body Text'
		}
	);
