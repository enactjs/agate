import kind from '@enact/core/kind';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {
	boolean,
	select,
	text,
	number
} from '@enact/storybook-utils/addons/controls';
import UiButton from '@enact/ui/Button';
import PropTypes from 'prop-types';
import Button, {ButtonBase} from '@enact/agate/Button';
import Skinnable from '@enact/agate/Skinnable';
import {iconList} from './util/icons';

Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UiButton, ButtonBase, Button);

// TODO
// Check for Silicon icons

// Set up some defaults for info and controls
const prop = {
	casing: ['preserve', 'sentence', 'word', 'upper'],
	colors: [
		'',
		'#E6444B',
		'#FDC902',
		'#986AAD',
		'#4E75E1',
		'#30CC83',
		'#44C8D5',
		'#47439B',
		'#2D32A6',
		'#4E75E1'
	],
	iconFlip: ['', 'auto', 'both', 'horizontal', 'vertical'],
	iconPosition: ['', 'before', 'after'],
	joinedPosition: ['', 'left', 'center', 'right'],
	minWidth: {
		'undefined/null (automatic)': '',
		'true (enforce)': true,
		'false (ignore)': 'false'
	}
};

// The following is needed to allow us to disambiguate between minWidth=false and minWidth=undefined
const threeWayBoolean = (value) => {
	switch (value) {
		case 'true':
			return true;
		case 'false':
			return false;
		case '':
			return null;
		default:
			return value;
	}
};

const SkinnedButtonBase = kind({
	name: 'SkinnedButton',

	propTypes: {
		skin: PropTypes.string
	},

	render: ({...rest}) => {
		// let icons =
		//   skin === 'silicon' ? ['', ...iconListSilicon] : ['', ...iconList];

		return (
			<Button
				{...rest}
				icon={rest['icon']}
				iconFlip={rest['iconFlip']}
				iconPosition={rest['iconPosition']}
			/>
		);
	}
});

const SkinnedButton = Skinnable({prop: 'skin'}, SkinnedButtonBase);

export default {
	title: 'Agate/Button',
	component: 'Button'
};

export const _Button = (args) => {

	return (
		<SkinnedButton
			animateOnRender={args['animateOnRender']}
			animationDelay={args['animationDelay']}
			backgroundOpacity={args['backgroundOpacity']}
			badge={args['badge']}
			badgeColor={args['badgeColor']}
			disabled={args['disabled']}
			highlighted={args['highlighted']}
			joinedPosition={args['joinedPosition']}
			minWidth={threeWayBoolean(args['minWidth'])}
			onClick={action('onClick')}
			selected={args['selected']}
			size={args['size']}
			tooltipText={args['tooltipText']}
			type={args['type']}
			icon={args['icon']}
			iconFlip={args['iconFlip']}
			iconPosition={args['iconPosition']}
		>
			{args['children']}
		</SkinnedButton>
	);
};

boolean('animateOnRender', _Button, Config);
number('animationDelay', _Button, Config);
select(
	'backgroundOpacity',
	_Button,
	['opaque', 'lightOpaque', 'transparent'],
	Config
);
text('badge', _Button, Config);
select('badgeColor', _Button, prop.colors, Config);
boolean('disabled', _Button, Config);
boolean('highlighted', _Button, Config);
select('joinedPosition', _Button, prop.joinedPosition, Config);
select('minWidth', _Button, prop.minWidth, Config);
boolean('selected', _Button, Config);
select('size', _Button, ['smallest', 'small', 'large', 'huge'], Config);
text('tooltipText', _Button, Config, 'This is a Button');
select('type', _Button, ['standard', 'grid'], Config);
text('children', _Button, Config, 'Click me');
select('icon', _Button, ['', ...iconList], Config, ''); // Here we should select icons based on the skin(special icons for silicon skin)
select('iconFlip', _Button, prop.iconFlip, Config);
select('iconPosition', _Button, prop.iconPosition, Config);
_Button.storyName = 'Button';
_Button.parameters = {
	info: {
		text: 'The basic Button'
	}
};
