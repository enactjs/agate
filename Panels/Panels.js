import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import ViewManager, {shape, SlideLeftArranger} from '@enact/ui/ViewManager';

import TabbedPanels from './TabbedPanels';

import componentCss from './Panels.less';

const PanelsBase = kind({
	name: 'Panels',
	propTypes: {
		arranger: PropTypes.shape(shape),
		duration: PropTypes.number,
		index: PropTypes.number
	},
	defaultProps: {
		arranger: SlideLeftArranger,
		duration: 250,
		index: 0
	},
	styles: {
		css: componentCss,
		className: 'panels',
		publicClassNames: 'panels enact-fit'
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
	PanelsBase as Panels,
	PanelsBase,
	TabbedPanels
};
