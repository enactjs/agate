import kind from '@enact/core/kind';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number, select, text} from '@enact/storybook-utils/addons/knobs';
import UiIcon from '@enact/ui/Icon';
import PropTypes from 'prop-types';
import Skinnable from '@enact/agate/Skinnable';
import Icon, {IconBase} from '@enact/agate/Icon';
import Heading from '@enact/agate/Heading';

import {iconList, iconListSilicon} from './icons';

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
			case 'silicon': {
				iconNames = iconListSilicon; break;
			}
			default: {
				iconNames = iconList;
			}
		}

		const iconType = select('icon type', ['glyph', 'url src', 'custom'], Config, 'glyph');
		let children;

		switch (iconType) {
			case 'glyph': children = select('icon', ['', ...iconNames], Config, 'home'); break;
			case 'url src': children = select('src', ['', docs, factory, logo], Config, logo); break;
			default: children = text('custom icon', Config);
		}

		return (
			<>
				<Icon
					{...rest}
					size={size}
				>
					{children}
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

export default {
	title: 'Agate/Icon',
	component: 'Icon'
};

export const _Icon = () => {
	const flip = select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '');
	const spriteCount = number('spriteCount', Config, {min: 1}, 1);

	return (
		<SkinnedIcon
			flip={flip}
			spriteCount={spriteCount}
		/>
	);
};

_Icon.storyName = 'Icon';
_Icon.parameters = {
	info: {
		text: 'Basic usage of Icon'
	}
};
