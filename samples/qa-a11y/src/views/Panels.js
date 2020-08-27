import Header from '@enact/agate/Header';
import {Panel, Panels} from '@enact/agate/Panels';
import Item from '@enact/agate/Item';
import Scroller from '@enact/agate/Scroller';
import VirtualList from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import React from 'react';

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

class PanelsView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			panelIndex: 0
		};
	}

	nextPanel = () => this.setState({panelIndex: 1});

	prevPanel = () => this.setState({panelIndex: 0});

	customItem = ({index, ...rest}) => {
		return (
			<Item {...rest} onClick={this.nextPanel}>
				{itemList[index]}
			</Item>
		);
	};

	render () {
		return (
			<Panels index={this.state.panelIndex} onBack={this.prevPanel}>
				<Panel>
					<Header title="Panel 0" />
					<VirtualList
						dataSize={itemList.length}
						itemRenderer={this.customItem}
						itemSize={ri.scale(156)}
					/>
				</Panel>
				<Panel>
					<Header title="Panel 1" />
					<Scroller>
						{
							itemList.map((item, key) => {
								return (
									<Item onClick={this.prevPanel} key={key}>{item}</Item>
								);
							})
						}
					</Scroller>
				</Panel>
			</Panels>
		);
	}
}

export default PanelsView;
