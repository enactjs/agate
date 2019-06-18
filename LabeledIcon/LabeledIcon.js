import kind from '@enact/core/kind';
import UiLabeledIcon from '@enact/ui/LabeledIcon';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './LabeledIcon.module.less';

const LabeledIconBase = kind({
	name: 'LabeledIcon',

	propTypes: /** @lends agate/Icon.Icon.prototype */ {
		/**
		 * The icon content.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link ui/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution}).
		 *
		 * @type {String|Object}
		 * @public
		 */
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
	},

	styles: {
		css: componentCss,
		className: 'labeledIcon',
		publicClassNames: true
	},

	render: (props) => UiLabeledIcon.inline({
		...props,
		iconComponent: Icon
	})
});


const LabeledIconDecorator = compose(
	Pure,
	Skinnable
);


const LabeledIcon = LabeledIconDecorator(LabeledIconBase);


export default LabeledIcon;
export {
	LabeledIcon,
	LabeledIconBase,
	LabeledIconDecorator
};
