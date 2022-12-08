import {Panels} from '@enact/agate/Panels';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {decreaseIndex, increaseIndex} from '../store';
import MainPanel from '../views/MainPanel';

const App = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		popPanel: PropTypes.func,
		pushPanel: PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	render: ({index, pushPanel, popPanel, ...rest}) => {
		return (
			<Panels {...rest} index={index} onBack={popPanel} noCloseButton>
				<MainPanel onClick={pushPanel} title="First" />
				<MainPanel onBack={popPanel} onClick={pushPanel} title="Second" />
				<MainPanel onBack={popPanel} onClick={pushPanel} title="Third" />
				<MainPanel onBack={popPanel} title="Fourth" />
			</Panels>
		);
	}
});

const mapStateToProps = ({index}) => ({
	index
});

const mapDispatchToProps = (dispatch) => {
	return {
		pushPanel: () => dispatch(increaseIndex()),
		popPanel: () => dispatch(decreaseIndex())
	};
};

export default ThemeDecorator(connect(mapStateToProps, mapDispatchToProps)(App));
