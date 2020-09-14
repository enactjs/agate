/**
 * Provides Moonstone-themed dial-like gauge component.
 *
 * @example
 * <Ticks progress={0.5} backgroundProgress={0.75} />
 *
 * @module moonstone/TicksBase
 * @exports TicksBase
 * @exports TicksBaseBase
 * @exports TicksBaseDecorator
 */

import kind from '@enact/core/kind';
// import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import React from 'react';
import UiTicks from '@enact/ui/Ticks';


import componentCss from './Ticks.module.less';

const TicksBase = kind({
	name: 'Ticks',

	propTypes: {
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		className: 'ticks',
		publicClassNames: ['ticks', 'tick']
	},

	render: ({css, ...rest}) => {

		return (
			<UiTicks {...rest} css={css} />
		);
	}
});


export default TicksBase;
export {
	TicksBase as Ticks,
	TicksBase
};
