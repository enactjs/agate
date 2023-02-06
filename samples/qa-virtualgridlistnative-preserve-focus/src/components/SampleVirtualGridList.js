import ImageItem from '@enact/agate/ImageItem';
import {VirtualGridList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import css from './SampleVirtualGridList.module.less';

const SampleVirtualGridList = ({index, onClick, ...rest}) => {
	const renderItem = useCallback(({index, ...rest}) => { // eslint-disable-line no-shadow
		const
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = `https://via.placeholder.com/300x300/${color}/ffffff/png?text=Image+${index}`;

		return (
			<ImageItem {...rest} onClick={onClick} src={source}>
				{`Image ${index}`}
			</ImageItem>
		);
	}, [onClick]);

	const id = `vgl_${index}`;

	return (
		<VirtualGridList
			{...rest}
			className={css.verticalPadding}
			dataSize={1000}
			id={id}
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(339),
				minHeight: ri.scale(339)
			}}
			scrollMode="native"
			spacing={ri.scale(10)}
			spotlightId={id}
		/>
	);
};

SampleVirtualGridList.propTypes = {
	index: PropTypes.number,
	onClick: PropTypes.func
};

export default SampleVirtualGridList;
