import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import GridListImageItem, {GridListImageItemBase} from '@enact/agate/GridListImageItem';

GridListImageItem.displayName = 'GridListImageItem';
const Config = mergeComponentMetadata('GridListImageItem', GridListImageItem, GridListImageItemBase);

const prop = {
	caption: 'caption',
	subCaption: 'subCaption'
};

storiesOf('Agate', module)
	.add(
		'GridListImageItem',
		() => (
			<GridListImageItem
				source="http://placehold.it/100x100/9037ab/ffffff&text=Image0"
				caption={text('caption', prop.caption, Config)}
				subCaption={text('subCaption', prop.subCaption, Config)}
			/>
		)
	);
