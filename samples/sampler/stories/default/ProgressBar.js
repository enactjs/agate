import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, range} from '@enact/storybook-utils/addons/controls';
import UiProgressBar from '@enact/ui/ProgressBar';
import ri from '@enact/ui/resolution';
import ProgressBar, {ProgressBarBase, ProgressBarTooltip} from '@enact/agate/ProgressBar';

ProgressBar.displayName = 'ProgressBar';
ProgressBarTooltip.displayName = 'ProgressBarTooltip';
const ProgressBarConfig = mergeComponentMetadata('ProgressBar', ProgressBarBase, ProgressBar, UiProgressBar);
const ProgressBarTooltipConfig = mergeComponentMetadata('ProgressBarTooltip', ProgressBarTooltip);


export default {
	title: 'Agate/ProgressBar',
	component: 'ProgressBar'
};

export const _ProgressBar = (args) => {
	// added here to force Storybook to put the ProgressBar tab first
	const disabled = args['disabled'];

	// added here to add conditioned styling to vertical ProgressBar so that the tooltip is visible when positioned "left" on LTR or "right" on RTL
	const orientation = args['orientation'];

	// tooltip is first so it appears at the top of the tab. the rest are alphabetical
	const tooltip = args['tooltip'];
	const position = args['position'];

	return (
		<ProgressBar
			backgroundProgress={args['backgroundProgress']}
			disabled={disabled}
			highlighted={args['highlighted']}
			orientation={orientation}
			progress={args['progress']}
			progressAnchor={args['progressAnchor']}
			size={args['size']}
			style={orientation === 'vertical' ? {marginLeft: ri.scaleToRem(93), marginRight: ri.scaleToRem(72)} : null}
		>
			{tooltip ? (
				<ProgressBarTooltip
					position={position}
				/>
			) : null}
		</ProgressBar>
	);
};

boolean('disabled', _ProgressBar, ProgressBarConfig);
select('orientation', _ProgressBar, ['horizontal', 'vertical'], ProgressBarConfig);
boolean('tooltip', _ProgressBar, ProgressBarTooltipConfig);
select('position', _ProgressBar, ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], ProgressBarTooltipConfig, '');
range('backgroundProgress', _ProgressBar, ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.5);
boolean('highlighted', _ProgressBar, ProgressBarConfig);
range('progress', _ProgressBar, ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.4);
range('progressAnchor', _ProgressBar, ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0);
select('size', _ProgressBar, ['small', 'large'], ProgressBarConfig);

_ProgressBar.storyName = 'ProgressBar';
_ProgressBar.parameters = {
	info: {
		text: 'The basic ProgressBar'
	}
};
