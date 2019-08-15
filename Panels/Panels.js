import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import ViewManager, {shape, SlideBottomArranger as VerticalArranger, SlideRightArranger as HorizontalArranger} from '@enact/ui/ViewManager';

import componentCss from './Panels.module.less';

import CancelDecorator from './CancelDecorator';

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
		onBack: PropTypes.func,
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
	render: ({children, ...rest}) => {
		delete rest.onBack;

		const mappedChildren = mapChildren(children);

		return (
			<ViewManager
				{...rest}
			>
				{mappedChildren}
			</ViewManager>
		);
	}
});

const PanelsDecorator = compose(
	CancelDecorator({cancel: 'onBack'})
);

const Panels = PanelsDecorator(PanelsBase);

export default Panels;
export {
	Panels,
	PanelsBase
};
