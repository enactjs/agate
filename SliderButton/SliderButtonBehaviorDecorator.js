import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import platform from '@enact/core/platform';
import PropTypes from 'prop-types';
import {useState, useRef} from 'react';
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
		const [valueText, setValueText] = useState(children ? children[0] : null);
		const ref = useRef();

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

		function handleKeyDown (ev) {
			if (isLeft(ev.keyCode)) {
				handleChange({value: Math.max(children.indexOf(valueText) - 1, 0)});
			} else if (isRight(ev.keyCode)) {
				handleChange({value: Math.min(children.indexOf(valueText) + 1, children.length - 1)});
			}
		}

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
