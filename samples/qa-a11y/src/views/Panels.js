/* eslint-disable react/jsx-no-bind */

import Header from '@enact/agate/Header';
import {Panel, Panels} from '@enact/agate/Panels';
import Item from '@enact/agate/Item';
import Scroller from '@enact/agate/Scroller';
import VirtualList from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import {useState} from 'react';

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

const PanelsView = () => {
	const [index, setIndex] = useState(0);

	const nextPanel = () => setIndex(1);
	const prevPanel = () => setIndex(0);
	const customItem = ({index: itemIndex, ...rest}) => {
		return (
			<Item {...rest} onClick={nextPanel}>
				{itemList[itemIndex]}
			</Item>
		);
	};

	return (
		<Panels index={index} onBack={prevPanel}>
			<Panel>
				<Header title="Panel 0" />
				<VirtualList
					dataSize={itemList.length}
					itemRenderer={customItem}
					itemSize={ri.scale(156)}
				/>
			</Panel>
			<Panel>
				<Header title="Panel 1" />
				<Scroller>
					{
						itemList.map((item, key) => {
							return (
								<Item onClick={prevPanel} key={key}>{item}</Item>
							);
						})
					}
				</Scroller>
			</Panel>
		</Panels>
	);
};

export default PanelsView;
