import kind from '@enact/core/kind';
import {emptify, mergeComponentMetadata} from '@enact/storybook-utils';
import {select, text, number} from '@enact/storybook-utils/addons/knobs';
import UiIcon from '@enact/ui/Icon';
import {iconList, iconListSilicon} from './icons';
import PropTypes from 'prop-types';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Skinnable from '@enact/agate/Skinnable';
import Icon, {IconBase} from '@enact/agate/Icon';
import Heading from '@enact/agate/Heading';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

Icon.displayName = 'Icon';
const Config = mergeComponentMetadata('Icon', UiIcon, IconBase, Icon);

const SkinnedIconBase = kind({
	name: 'SkinIcon',

	propTypes: {
		skin: PropTypes.string
	},

	render: ({skin, ...rest}) => {
		let iconNames;
		const size = select('size', ['smallest', 'small', 'large', 'huge'], Config, 'large');

		switch (skin) {
			case 'silicon':  {
				iconNames = iconListSilicon; break;
			}
			default: {
				iconNames = iconList;
			}
		}

		return (
			<>
				<Icon
					{...rest}
				>
					{emptify(select('src', ['', docs, factory, logo], Icon, '')) + emptify(select('icon', ['', ...iconNames], Icon, 'home')) + emptify(text('custom icon', Icon, ''))}
				</Icon>
				<br />
				<br />
				<Heading>All Icons</Heading>
				{iconNames.map((icon, index) => <Icon key={index} size={size} title={icon}>{icon}</Icon>)}
			</>
		);
	}
});

const SkinnedIcon = Skinnable({prop: 'skin'}, SkinnedIconBase);

storiesOf('Agate', module)
	.add(
		'Icon',
		() => {
			const flip = select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '');
			const spriteCount = number('spriteCount', Config, {min: 1}, 1);
			return (
				<SkinnedIcon
					flip={flip}
					spriteCount={spriteCount}
				/>
			);
		},
		{
			text: 'Basic usage of Icon'
		}
	);
