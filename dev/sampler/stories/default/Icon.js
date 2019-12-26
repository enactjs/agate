import Icon, {IconBase} from '@enact/agate/Icon';
import Heading from '@enact/agate/Heading';
import UiIcon from '@enact/ui/Icon';
import Scroller from '@enact/ui/Scroller';
import iconNames from './icons';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {select, text} from '../../src/enact-knobs';
import emptify from '../../src/utils/emptify.js';
import {mergeComponentMetadata} from '../../src/utils';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

const Config = mergeComponentMetadata('Icon', UiIcon, IconBase, Icon);

storiesOf('Agate', module)
	.add(
		'Icon',
		() => {
			const size = select('size', ['small', 'large'], Config, 'large');
			return (
				<Scroller style={{height: '100%'}}>
					<Icon
						size={size}
					>
						{emptify(select('src', ['', docs, factory, logo], Icon, '')) + emptify(select('icon', ['', ...iconNames], Icon, 'home')) + emptify(text('custom icon', Icon, ''))}
					</Icon>
					<br />
					<br />
					<Heading>All Icons</Heading>
					{iconNames.map((icon, index) => <Icon key={index} size={size} title={icon}>{icon}</Icon>)}
				</Scroller>
			);
		},
		{
			text: 'Basic usage of Icon'
		}
	);
