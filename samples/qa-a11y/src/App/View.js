import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import Scroller from '@enact/agate/Scroller';
import {checkPropTypes} from '@enact/core/util';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

const View = (props) => {
	checkPropTypes(View, props);
	const {debugProps = false, handleDebug, isAriaHidden = false, isDebugMode = false, isHeader = true, title, view: ComponentView} = props;
	const
		header = isHeader ? <Header aria-hidden={isAriaHidden} title={title} /> : null,
		viewProps = debugProps ? {handleDebug, isDebugMode} : null;

	return (
		<Panel aria-owns="floatLayer" style={{padding: 0}}>
			{header}
			<Layout orientation="vertical">
				<Cell component={Scroller} direction="vertical">
					<ComponentView {...viewProps} />
				</Cell>
			</Layout>
		</Panel>
	);
};

View.propTypes = {
	debugProps: PropTypes.bool,
	handleDebug: PropTypes.func,
	isAriaHidden: PropTypes.bool,
	isDebugMode: PropTypes.bool,
	isHeader: PropTypes.bool,
	title: PropTypes.string,
	view: PropTypes.func
};

export default View;
