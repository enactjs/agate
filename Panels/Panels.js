import kind from '@enact/core/kind';
import Measurable from '@enact/ui/Measurable';
import Slottable from '@enact/ui/Slottable';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import ViewManager, {shape, SlideBottomArranger as VerticalArranger, SlideRightArranger as HorizontalArranger} from '@enact/ui/ViewManager';

import CancelDecorator from './CancelDecorator';
import Controls from './Controls';
import IdProvider from './IdProvider';
import Panel from './Panel';
import TabbedPanels from './TabbedPanels';

import componentCss from './Panels.module.less';

const getControlsId = (id) => id && `${id}-controls`;
const mapChildren = (children, generateId) => React.Children.map(children, (child, index) => {
	if (child) {
		const {spotlightId = generateId(index, 'panel-container', Spotlight.remove)} = child.props;
		const props = {
			spotlightId,
			'data-index': index
		};

		// if (child.props.autoFocus == null && this.state.direction === 'forward') {
		//	props.autoFocus = 'default-element';
		// }

		return React.cloneElement(child, props);
	} else {
		return null;
	}
});

const PanelsBase = kind({
	name: 'Panels',
	propTypes: {
		/**
		 * Function that generates unique identifiers for Panel instances.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		generateId: PropTypes.func.isRequired,

		arranger: shape,

		/**
		 * Sets the hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * A slot to insert additional Panels-level buttons into the global-navigation area.
		 *
		 * @type {Node}
		 * @public
		 */
		controls: PropTypes.node,

		/**
		 * The measurement bounds of the controls node
		 *
		 * @type {Object}
		 * @private
		 */
		controlsMeasurements: PropTypes.object,

		/**
		 * The method which receives the reference node to the controls element, used to determine
		 * the `controlsMeasurements`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		controlsRef: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.shape({current: PropTypes.any})
		]),

		duration: PropTypes.number,

		/**
		 * Unique identifier for the Panels instance.
		 *
		 * When defined, `Panels` will manage the presentation state of `Panel` instances in order
		 * to restore it when returning to the `Panel`. See
		 * [noSharedState]{@link agate/Panels.Panels.noSharedState} for more details on shared
		 * state.
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		index: PropTypes.number,

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Indicates the close button will not be rendered on the top right corner.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onApplicationClose: PropTypes.func,

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
		className: ({controls, noCloseButton, styler}) => styler.append({
			'agate-panels-hasControls': (!noCloseButton || !!controls), // If there is a close button or controls were specified
			'viewport': true
		}),
		enteringProp: ({noAnimation}) => noAnimation ? null : 'hideChildren',
		style: ({controlsMeasurements, style = {}}) => (controlsMeasurements ? {
			...style,
			'--agate-panels-controls-width': controlsMeasurements.width + 'px'
		} : style)
	},
	render: ({children, closeButtonAriaLabel, controls, controlsRef, generateId, id, noCloseButton, onApplicationClose, ...rest}) => {
		delete rest.controlsMeasurements;

		const controlsId = getControlsId(id);
		const mappedChildren = mapChildren(children, generateId);

		return (
			<>
				<Controls
					closeButtonAriaLabel={closeButtonAriaLabel}
					id={controlsId}
					spotlightId={controlsId}
					noCloseButton={noCloseButton}
					onApplicationClose={onApplicationClose}
					ref={controlsRef}
				>
					{controls}
				</Controls>
				<ViewManager
					{...rest}
				>
					{mappedChildren}
				</ViewManager>
			</>
		);
	}
});

const PanelsDecorator = compose(
	Slottable({slots: ['controls']}),
	CancelDecorator({cancel: 'onBack'}),
	Measurable({refProp: 'controlsRef', measurementProp: 'controlsMeasurements'}),
	IdProvider
);

const Panels = PanelsDecorator(PanelsBase);

export default PanelsBase;
export {
	Panel,
	Panels,
	PanelsBase,
	TabbedPanels
};
