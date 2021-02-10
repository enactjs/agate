import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiBodyText from '@enact/ui/BodyText';
import React from 'react';

import BodyText, {BodyTextBase} from '@enact/agate/BodyText';

BodyText.displayName = 'BodyText';
const Config = mergeComponentMetadata('BodyText', UiBodyText, BodyText, BodyTextBase);

const prop = {
	sizes: ['', 'large', 'small']
};

export default {
	title: 'Agate/BodyText',
	component: 'BodyText'
}

export const _BodyText = () => (
	<BodyText
		centered={boolean('centered', Config)}
		noWrap={boolean('noWrap', Config)}
		size={select('size', prop.sizes, Config)}
	>
		{text('children', BodyText, 'This is a body text')}
	</BodyText>
);

_BodyText.storyName = 'BodyText';
_BodyText.parameters = {
	info: {
		text: 'The basic Body Text'
	}
};
