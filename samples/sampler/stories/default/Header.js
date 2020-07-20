import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import {Header, HeaderBase} from '@enact/agate/Header';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

// Set up some defaults for children knob
const prop = {
	children: {
		'no buttons': null,
		'1 button': <Button icon="home" />,
		'2 buttons': (
			<React.Fragment>
				<Button>A Button</Button>
				<Button icon="home" />
			</React.Fragment>
		)
	}
};

storiesOf('Agate', module)
	.add(
		'Header',
		() => {
			const childrenSelection = select('children', ['no buttons', '1 button', '2 buttons'], Config);
			const children = prop.children[childrenSelection];

			const story = (
				<Header
					hideLine={boolean('hideLine', Config)}
					subtitle={text('subtitle', Config, 'Sub Title')}
					title={text('title', Config, 'Main Title')}
					titleAbove={text('titleAbove', Config, '')}
				>
					{children}
				</Header>
			);
			return story;
		},
		{
			text: 'A block to use as a screen\'s title and description. Supports additional buttons, subtitle and title above.'
		}
	);
