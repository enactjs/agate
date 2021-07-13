import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
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

export const _ProgressBar = () => {
	// added here to force Storybook to put the ProgressBar tab first
	const disabled = boolean('disabled', ProgressBarConfig);

	// added here to add conditioned styling to vertical ProgressBar so that the tooltip is visible when positioned "left" on LTR or "right" on RTL
	const orientation = select('orientation', ['horizontal', 'vertical'], ProgressBarConfig);

	// tooltip is first so it appears at the top of the tab. the rest are alphabetical
	const tooltip = boolean('tooltip', ProgressBarTooltipConfig);
	const position = select('position', ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], ProgressBarTooltipConfig, '');

	return (
		<ProgressBar
			backgroundProgress={number('backgroundProgress', ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.5)}
			disabled={disabled}
			highlighted={boolean('highlighted', ProgressBarConfig)}
			orientation={orientation}
			progress={number('progress', ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.4)}
			progressAnchor={number('progressAnchor', ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0)}
			size={select('size', ['small', 'large'], ProgressBarConfig)}
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

_ProgressBar.storyName = 'ProgressBar';
_ProgressBar.parameters = {
	info: {
		text: 'The basic ProgressBar'
	}
};
