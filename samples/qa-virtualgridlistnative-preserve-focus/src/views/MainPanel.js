import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import SampleVirtualGridList from '../components/SampleVirtualGridList';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onBack: PropTypes.func,

		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	render: ({onBack, onClick, title, ...rest}) => (
		<Panel {...rest}>
			<Header title={title}>
				<Button onClick={onClick}>Click me</Button>
				<Button onClick={onBack}>Back</Button>
			</Header>
			<SampleVirtualGridList index={rest['data-index']} onClick={onClick} />
		</Panel>
	)
});

export default MainPanel;
