import CheckboxItem from '@enact/agate/CheckboxItem';
import Input from '@enact/agate/Input';
import {Cell, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';

import LocaleSwitch from '../LocaleSwitch';
import ScrollModeSwitch from '../ScrollModeSwitch';

const Controls = ({handleFocusableScrollbar, handleHeight, handleScrollMode, handleWidth, height, nativeScroll, width}) => {
	const inputWidth = {width: '5em'};
	const rowWidth = typeof window !== 'undefined' ? `${ri.scaleToRem(window.innerWidth)}` : `${ri.scaleToRem(1920)}`;

	return (
		<Row style={{width: rowWidth}} wrap>
			<Cell align="center" shrink>
				<label>height:</label>
				<Input onChange={handleHeight} size="small" style={inputWidth} type="number" value={height} />
			</Cell>
			<Cell align="center" shrink>
				<label>width:</label>
				<Input onChange={handleWidth} size="small" style={inputWidth} type="number" value={width} />
			</Cell>
			<CheckboxItem onClick={handleFocusableScrollbar} style={{minWidth: '12em'}}>Focusable Scrollbar</CheckboxItem>
			<ScrollModeSwitch defaultSelected={nativeScroll} onToggle={handleScrollMode} style={{minWidth: '12em'}} />
			<LocaleSwitch style={{minWidth: '12em'}} />
		</Row>
	);
};

Controls.propTypes = {
	handleFocusableScrollbar: PropTypes.func,
	handleHeight: PropTypes.func,
	handleScrollMode: PropTypes.func,
	handleWidth: PropTypes.func,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	nativeScroll: PropTypes.bool,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Controls;
