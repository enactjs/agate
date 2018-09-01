import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import ViewManager, {shape, SlideArranger} from '@enact/ui/ViewManager';

import Panel from './Panel';
import TabbedPanels from './TabbedPanels';

import componentCss from './Panels.less';

import easing from 'eases/back-out';
import * as arrange from '@enact/ui/ViewManager/arrange';

const slideIn = arrange.reverse(arrange.fadeIn);
const slideOut = arrange.reverse(arrange.fadeOut);

const HorizontalArranger = SlideArranger({
	amount: 50,
	enter: 'right',
	leave: 'left'
});
HorizontalArranger.enter = arrange.ease(
	easing,
	arrange.compose(slideIn, HorizontalArranger.enter)
);
HorizontalArranger.leave = arrange.ease(
	easing,
	arrange.compose(slideOut, HorizontalArranger.leave)
);

const VerticalArranger = SlideArranger({
	amount: 50,
	enter: 'bottom',
	leave: 'top'
});
VerticalArranger.enter = arrange.ease(
	easing,
	arrange.compose(slideIn, VerticalArranger.enter)
);
VerticalArranger.leave = arrange.ease(
	easing,
	arrange.compose(slideOut, VerticalArranger.leave)
);

const PanelsBase = kind({
	name: 'Panels',
	propTypes: {
		arranger: PropTypes.shape(shape),
		duration: PropTypes.number,
		index: PropTypes.number,
		orientation: PropTypes.string
	},
	defaultProps: {
		// arranger: HorizontalArranger,
		duration: 500,
		index: 0
	},
	styles: {
		css: componentCss,
		className: 'panels',
		publicClassNames: 'panels enact-fit'
	},
	computed: {
		arranger: ({arranger, orientation}) => {
			if (arranger) return arranger;
			if (orientation === 'vertical') return VerticalArranger;
			else return HorizontalArranger;
		}
	},
	render: (props) => {
		return (
			<ViewManager
				{...props}
			/>
		);
	}
});

export default PanelsBase;
export {
	Panel,
	PanelsBase as Panels,
	PanelsBase,
	TabbedPanels
};
