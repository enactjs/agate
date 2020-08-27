import platform from '@enact/core/platform';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

// Adds agate-specific SliderButton behaviors
// * aria-valuetext handling
const SliderButtonBehaviorDecorator = (Wrapped) => {
	const useValueText = ({onChange, ...rest}) => {
		const {children} = rest;
		const [valueText, setValueText] = React.useState(children[0]);
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
				onChange={handleChange}
				ref={ref}
				role="slider"
				{...rest}
				onDragStart={handleDragStart}
			/>
		);
	};

	useValueText.propTypes = {
		onChange: PropTypes.func
	};

	return useValueText;
};

export default SliderButtonBehaviorDecorator;
export {
	SliderButtonBehaviorDecorator
};
