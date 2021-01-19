import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import platform from '@enact/core/platform';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

const isLeft = is('left');
const isRight = is('right');

/**
 * SliderButtonBehaviorDecorator passes props to support a11y feature in SliderButton
 *
 * @class SliderButtonBehaviorDecorator
 * @memberof agate/SliderButton
 * @private
 */
const SliderButtonBehaviorDecorator = (Wrapped) => {
	// eslint-disable-next-line no-shadow
	function SliderButtonBehaviorDecorator (props) {
		const {children} = props;
		const [valueText, setValueText] = React.useState(children ? children[0] : null);
		const ref = React.useRef();
		console.log(props);

		function handleChange ({value}) {
			setValueText(children[value]);
			forward('onChange', {
				type: 'onChange',
				value
			}, props);
		}

		function handleDragStart () {
			// on platforms with a touchscreen, we want to focus slider when dragging begins
			if (platform.touchscreen) {
				findDOMNode(ref.current).focus(); // eslint-disable-line react/no-find-dom-node
			}
		}

		function handleKeyDown (ev, props) {
			forward('onKeyDown', ev, props);

			if (isLeft(ev.keyCode)) {
				handleChange({value: 0});
				// forward('onKeyDown', ev, props);
			} else if (isRight(ev.keyCode)) {
				handleChange({value: 1});
				// forward('onKeyDown', ev, props);
			}
		}

		// function handleKeyDown (ev, props) {
		// 	const value = ((valueText || valueText === 0) ? valueText : children[0]);
		// 	const index = children.findIndex(child => child === value);
		//
		// 	forward('onKeyDown', ev, props);
		//
		// 	if (!disabled) {
		// 		if (isLeft(ev.keyCode)) {
		// 			handleChange(valueText);
		// 		} else if (isRight(ev.keyCode)) {
		// 			handleChange(children[Math.min(index + 1, value.length - 1)]);
		// 		}
		// 	}
		// }

		// function handleKeyDown ({value}) {
		// 	forward('onKeyDown', {
		// 		type: 'onChange',
		// 		value
		// 	}, props);
		// 	setValueText(children[value]);
		// }

		// function handleKeyDown () {
		// 	console.log('test');
		// }

		return (
			<Wrapped
				aria-valuetext={valueText}
				ref={ref}
				role="slider"
				{...props}
				onChange={handleChange}
				onDragStart={handleDragStart}
				onKeyDown={handleKeyDown}
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
