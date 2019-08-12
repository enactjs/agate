import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import ViewManager, {shape, SlideBottomArranger as VerticalArranger, SlideRightArranger as HorizontalArranger} from '@enact/ui/ViewManager';

import Panel from './Panel';
import TabbedPanels from './TabbedPanels';

import componentCss from './Panels.module.less';

const mapChildren = (childs) => React.Children.map(childs, (child, index) => {
	return child ? React.cloneElement(child, {
		'data-index': index
	}) : null;
});

const PanelsBase = kind({
	name: 'Panels',
	propTypes: {
		arranger: shape,
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
		},
		enteringProp: ({noAnimation}) => noAnimation ? null : 'hideChildren'
	},
	render: ({children, ...props}) => {
		const mappedChildren = mapChildren(children);

		return (
			<ViewManager
				{...props}
			>
				{mappedChildren}
			</ViewManager>
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
