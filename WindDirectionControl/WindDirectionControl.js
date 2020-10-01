/**
 * Agate styled WindDirectionControl component and behavior.
 *
 * @example
 * <WindDirectionControl />
 *
 * @module agate/WindDirectionControl
 * @exports WindDirectionControl
 * @exports WindDirectionControlBase
 * @exports WindDirectionControlDecorator
 */

import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import ArcPicker from '../ArcPicker';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './WindDirectionControl.module.less';

/**
 * An Agate component for displaying Wind Direction Control {@link agate/WindDirectionControl}.
 *
 * @class WindDirectionControl
 * @memberof agate/WindDirectionControl
 * @ui
 * @private
 */
const WindDirectionControlBase = kind({
	name: 'WindDirectionControlBase',

	propTypes: /** @lends agate/WindDirectionControl.WindDirectionControlBase.prototype */ {
		/**
		 * Called when value is changed.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * State of WindDirectionControl.
		 *
		 * @type {(''|'airDown'|'airRight'|'airUp')}
		 * @default 'airDown'
		 * @public
		 */
		value:  PropTypes.oneOf(['airDown', 'airRight', 'airUp'])
	},

	defaultProps: {
		value: 'airDown'
	},

	styles: {
		css,
		className: 'windDirectionControl'
	},

	computed: {
		componentIcon: (props) => {
			const {value} = props;

			switch (value) {
				case 'airDown':
					return 'airdown';
				case 'airRight':
					return 'airup';
				case 'airUp':
					return 'airright';
			}
		}
	},

	render: ({componentIcon,  onChange, value, ...rest}) => {
		const children = ['airDown', 'airRight', 'airUp'];

		return (
			<div {...rest}>
				<ArcPicker
					endAngle={210}
					onChange={onChange}
					value={value}
					slotCenter={
						<>
							<Icon className={css.airDirectionIcon} css={css}>{componentIcon}</Icon>
						</>
					}
				>
					{children}
				</ArcPicker>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [WindDirectionControl]{@link agate/WindDirectionControl.WindDirectionControl} components.
 *
 * @hoc
 * @memberof agate/WindDirectionControl
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const WindDirectionControlDecorator = compose(
	Changeable,
	Skinnable
);

const WindDirectionControl = WindDirectionControlDecorator(WindDirectionControlBase);

export default WindDirectionControl;
export {
	WindDirectionControl,
	WindDirectionControlBase,
	WindDirectionControlDecorator
};
