import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import UiButton from '@enact/ui/Button';
import React from 'react';

import Button, {ButtonBase} from '@enact/agate/Button';
import Skinnable from '@enact/agate/Skinnable';

// import iconList, {iconListSilicon} from './icons';

Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UiButton, ButtonBase, Button);

// Set up some defaults for info and knobs
const prop = {
	casing: ['preserve', 'sentence', 'word', 'upper'],
	colors: ['', '#E6444B', '#FDC902', '#986AAD', '#4E75E1', '#30CC83', '#44C8D5', '#47439B', '#2D32A6', '#4E75E1'],
	iconFlip: ['', 'auto', 'both', 'horizontal', 'vertical'],
	iconPosition: ['', 'before', 'after'],
	joinedPosition: ['', 'left', 'center', 'right'],
	minWidth: {'undefined/null (automatic)': '', 'true (enforce)': true, 'false (ignore)': 'false'}
};

// The following is needed to allow us to disambiguate between minWidth=false and minWidth=undefined
const threeWayBoolean = (value) => {
	switch (value) {
		case 'true': return true;
		case 'false': return false;
		case '': return null;
		default: return value;
	}
};

const SkinnedButton = Skinnable(
	{prop: 'skin'},
	({skin, ...rest}) => {
		// let icons = skin === 'silicon' ? ['', ...iconListSilicon] :  ['', ...iconList];

		return (
			<Button
				{...rest}
				animateOnRender={boolean('animateOnRender', Config)}
				animationDelay={number('animationDelay', Config)}
				backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
				badge={text('badge', Config)}
				badgeColor={select('badgeColor', prop.colors, Config)}
				disabled={boolean('disabled', Config)}
				highlighted={boolean('highlighted', Config)}
				// icon={select('icon', icons, Config)}
				// iconFlip={select('iconFlip', prop.iconFlip, Config)}
				iconPosition={select('iconPosition', prop.iconPosition, Config)}
				joinedPosition={select('joinedPosition', prop.joinedPosition, Config)}
				minWidth={threeWayBoolean(select('minWidth', prop.minWidth, Config))}
				onClick={action('onClick')}
				selected={boolean('selected', Config)}
				size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
				tooltipText={text('tooltipText', Config, 'This is a Button')}
				type={select('type', ['standard', 'grid'], Config)}
			>
				{text('children', Config, 'Click me')}
			</Button>
		);
	}
);

export default {
	title: 'Agate/Button',
	component: 'Button'
}

export const _Button = () => (
	<SkinnedButton />
);

_Button.storyName = 'Button';
_Button.parameters = {
	info: {
		text: 'The basic Button'
	}
};
