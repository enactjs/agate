import platform from '@enact/core/platform';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

/**
 * SliderButtonBehaviorDecorator passes props to support a11y feature in SliderButton
 *
 * @class SliderButtonBehaviorDecorator
 * @memberof agate/SliderButton
 * @private
 */
const SliderButtonBehaviorDecorator = (Wrapped) => {
	// eslint-disable-next-line no-shadow
	function SliderButtonBehaviorDecorator ({onChange, ...rest}) {
		const {children} = rest;
		const [valueText, setValueText] = React.useState(children ? children[0] : null);
		const ref = React.useRef();

		function handleChange ({value}) {
			onChange();
			setValueText(children[value]);
		}

		function handleDragStart () {
			// on platforms with a touchscreen, we want to focus slider when dragging begins
			if (platform.touchscreen) {
				findDOMNode(ref.current).focus(); // eslint-disable-line react/no-find-dom-node
			}
		}

		return (
			<Wrapped
				aria-valuetext={valueText}
				ref={ref}
				role="slider"
				{...rest}
				onChange={handleChange}
				onDragStart={handleDragStart}
			/>
		);
	}

	SliderButtonBehaviorDecorator.propTypes = {
		onChange: PropTypes.func
	};

	return SliderButtonBehaviorDecorator;
};

export default SliderButtonBehaviorDecorator;
export {
	SliderButtonBehaviorDecorator
};
