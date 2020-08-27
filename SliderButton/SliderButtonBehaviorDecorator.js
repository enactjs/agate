import platform from '@enact/core/platform';
import React from 'react';
import {findDOMNode} from 'react-dom';

const SliderButtonBehaviorDecorator = (Wrapped) => (({onChange, ...rest}) => {
	const {children} = rest;
	const [value, setValue] = React.useState(0);
	const ref = React.useRef();

	const handleChange = ({value}) => {
		onChange();
		setValue(value);
	}
	
	const handleDragStart = () => {
		// on platforms with a touchscreen, we want to focus slider when dragging begins
		if (platform.touchscreen) {
			findDOMNode(ref.current).focus();
		}
	}

	return (
		<Wrapped
			aria-valuetext={children[value]}
			onChange={handleChange}
			ref={ref}
			role="slider"
			{...rest}
			onDragStart={handleDragStart}
		/>
	);
});

export default SliderButtonBehaviorDecorator;
export {
	SliderButtonBehaviorDecorator
};
