import {emptify, mergeComponentMetadata} from '@enact/storybook-utils';
import {select, text, number} from '@enact/storybook-utils/addons/knobs';
import UiIcon from '@enact/ui/Icon';
import Scroller from '@enact/ui/Scroller';
import iconNames from './icons';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon, {IconBase} from '../../../../Icon';
import Heading from '../../../../Heading';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

Icon.displayName = 'Icon';
const Config = mergeComponentMetadata('Icon', UiIcon, IconBase, Icon);

storiesOf('Agate', module)
	.add(
		'Icon',
		() => {
			const flip = select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '');
			const size = select('size', ['smallest', 'small', 'large', 'huge'], Config, 'large');
			const spriteCount = number('spriteCount', Config, {min: 1}, 1);
			return (
				<Scroller style={{height: '100%'}}>
					<Icon
						flip={flip}
						size={size}
						spriteCount={spriteCount}
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
