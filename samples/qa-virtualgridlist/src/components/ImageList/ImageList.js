import {VirtualGridList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {connect} from 'react-redux';

import ImageItem from '../ImageItem';

import * as css from './ImageList.module.less';

const ImageList = ({imageItems, minHeight, minWidth, spacing, selectedItems, ...rest}) => {
	const calculateOfSize = (size) => ri.scale(parseInt(size) || 0);

	const renderItem = useCallback(({...renderRest}) => {
		const isSelected = selectedItems.includes(renderRest['index']);
		return <ImageItem style={{borderColor: isSelected && 'red'}} {...renderRest} />;
	}, [selectedItems]);

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			className={rest.direction === 'horizontal' ? css.horizontalPadding : css.verticalPadding}
			dataSize={imageItems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: calculateOfSize(minHeight), minWidth: calculateOfSize(minWidth)}}
			spacing={calculateOfSize(spacing)}
		/>
	);
};

ImageList.propTypes = {
	direction: PropTypes.string,
	dispatch: PropTypes.func,
	imageItems: PropTypes.array,
	minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	selectedItems: PropTypes.array,
	spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const mapStateToProps = ({data}) => ({
	imageItems: data.dataOrder,
	minHeight: data.minHeight,
	minWidth: data.minWidth,
	selectedItems: data.selectedItems,
	spacing: data.spacing
});

export default connect(mapStateToProps)(ImageList);
