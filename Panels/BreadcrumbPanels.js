import Measurable from '@enact/ui/Measurable';
import Slottable from '@enact/ui/Slottable';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable/Skinnable';

import {PanelsArranger} from './Arrangers';
import BreadcrumbDecorator from './BreadcrumbDecorator';
import {PanelsBase} from './Panels';

const BreadcrumbPanelsDecorator = compose(
	Slottable({slots: ['controls']}),
	Measurable({refProp: 'controlsRef', measurementProp: 'controlsMeasurements'}),
	Skinnable,
	BreadcrumbDecorator({
		className: 'panels breadcrumbPanels enact-fit',
		max: 1,
		panelArranger: PanelsArranger
	})
);

/**
 * An instance of Panels in which the Panel uses the entire viewable screen with a single breadcrumb
 * for the previous panel when viewing any panel beyond the first.
 *
 * **Note** BreadcrumbPanels requires that the `data-index` property that all panels variations add to
 * its children be applied to the root DOM node of each child in order to manage layout correctly.
 * It is recommended that you spread any extra props on the root node but you may also handle this
 * property explicitly if necessary.
 *
 * @class BreadcrumbPanels
 * @memberof agate/Panels
 * @ui
 * @public
 */
const BreadcrumbPanels = BreadcrumbPanelsDecorator(PanelsBase);
BreadcrumbPanels.displayName = 'BreadcrumbPanels';

export default BreadcrumbPanels;
export {
	BreadcrumbPanels
};
