import ImageItem from '@enact/agate/ImageItem';
import {connect} from 'react-redux';

import {selectItem} from '../../store';

const mapStateToProps = ({data: {data: allItems, selectedItems}}, {['data-index']: dataIndex}) => {
	const {
		caption: children,
		subCaption: label,
		src
	} = allItems[dataIndex];

	return {
		children,
		label,
		selected: selectedItems.includes(dataIndex),
		src
	};
};

const mapDispatchToProps = (dispatch, {['data-index']: dataIndex}) => {
	return {
		onClick: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);
