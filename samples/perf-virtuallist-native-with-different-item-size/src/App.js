import Dropdown from '@enact/agate/Dropdown';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import {useCallback, useState} from 'react';

import HorizontalDifferentWidthItemList from './views/HorizontalDifferentWidthItemList';
import VerticalDifferentHeightItemList from './views/VerticalDifferentHeightItemList';
import VerticalExpandableDifferentHeightItemList from './views/VerticalExpandableDifferentHeightItemList';

const views = [
	HorizontalDifferentWidthItemList,
	VerticalDifferentHeightItemList,
	VerticalExpandableDifferentHeightItemList
];

const viewNames = [
	'HorizontalDifferentWidthItemList',
	'VerticalDifferentHeightItemList',
	'VerticalExpandableDifferentHeightItemList'
];

const defaultViewIndex = 0;

const VirtualListSample = (props) => {
	const [index, setIndex] = useState(defaultViewIndex);

	const onSelect = useCallback(({selected}) => {
		setIndex(selected);
	}, []);

	const View = views[index];

	return (
		<div {...props}>
			<Dropdown
				direction="below"
				onSelect={onSelect}
				title={viewNames[defaultViewIndex]}
				width="huge"
			>
				{viewNames}
			</Dropdown>
			<View />
		</div>
	);
};

export default ThemeDecorator(VirtualListSample);
