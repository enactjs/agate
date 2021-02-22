import kind from '@enact/core/kind';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select, number} from '@enact/storybook-utils/addons/knobs';
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
	name: 'SkinnedIcon',

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

		const children = select('children', ['glyph', 'url src'], Config, 'glyph');
		let availableIcons;

		switch (children) {
			case 'glyph': availableIcons = select('icon', ['', ...iconNames], Icon, 'home'); break;
			case 'url src': availableIcons = select('src', ['', docs, factory, logo], Config, logo); break;
			default: break;
		}

		return (
			<>
				<Icon
					{...rest}
					size={size}
				>
					{availableIcons}
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
SkinnedIcon.displayName = 'Icon';

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
