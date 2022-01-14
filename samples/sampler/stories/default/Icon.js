import kind from '@enact/core/kind';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number, select, text} from '@enact/storybook-utils/addons/controls';
import UiIcon from '@enact/ui/Icon';
import PropTypes from 'prop-types';
import Skinnable from '@enact/agate/Skinnable';
import Icon, {IconBase} from '@enact/agate/Icon';
import Heading from '@enact/agate/Heading';

import {iconList, iconListSilicon} from './util/icons';

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

	render: ({customIcon, icon, iconType, size, skin, src, ...rest}) => {
		let iconNames;

		switch (skin) {
			case 'silicon': {
				iconNames = iconListSilicon;
				break;
			}
			default: {
				iconNames = iconList;
			}
		}

		let children;

		switch (iconType) {
			case 'glyph':
				children = icon;
				break;
			case 'url src':
				children = src;
				break;
			default:
				children = customIcon;
		}

		return (
			<>
				<Icon {...rest} size={size}>
					{children}
				</Icon>
				<br />
				<br />
				<Heading>All Icons</Heading>
				{iconNames.map((icon, index) => (
					<Icon key={index} size={size} title={icon}>
						{icon}
					</Icon>
				))}
			</>
		);
	}
});

const SkinnedIcon = Skinnable({prop: 'skin'}, SkinnedIconBase);
SkinnedIcon.displayName = 'Icon';

export default {
	title: 'Agate/Icon',
	component: 'Icon'
};

export const _Icon = (args) => {
	const flip = args['flip'];
	const spriteCount = args['spriteCount'];

	return (
		<SkinnedIcon
			flip={flip}
			spriteCount={spriteCount}
			size={args['size']}
			icon={args['icon']}
			src={args['src']}
			customIcon={args['custom icon']}
			iconType={args['icon type']}
		/>
	);
};

select('flip', _Icon, ['', 'both', 'horizontal', 'vertical'], Config, '');
number('spriteCount', _Icon, Config, 1);
select('size', _Icon, ['smallest', 'small', 'large', 'huge'], Config, 'large');
select('icon type', _Icon, ['glyph', 'url src', 'custom'], Config, 'glyph');
select('icon', _Icon, ['', ...iconList], Config, 'home');
select('src', _Icon, ['', docs, factory, logo], Config, logo);
text('custom icon', _Icon, Config);

_Icon.storyName = 'Icon';
_Icon.parameters = {
	info: {
		text: 'Basic usage of Icon'
	}
};
