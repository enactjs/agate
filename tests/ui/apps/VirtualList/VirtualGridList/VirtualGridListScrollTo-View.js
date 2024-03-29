import ri from '@enact/ui/resolution';
import {Component} from 'react';

import {ImageItem} from '../../../../../ImageItem';
import {Panels, Panel} from '../../../../../Panels';
import ThemeDecorator from '../../../../../ThemeDecorator';
import {VirtualGridList} from '../../../../../VirtualList';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			dataSize: 50
		};
	}

	componentDidUpdate () {
		if (this.state.dataSize === 0) {
			// Intend to receive data asynchronously.
			setTimeout(() => {
				this.setState({dataSize: 50}, () => {
					this.scrollTo({index: 0, focus: true, animate: false});
				});
			}, 10);
		}
	}

	renderItem = ({index, ...rest}) => {
		return (
			<ImageItem
				{...rest}
				id={`item${index}`}
				onClick={this.handleClick}
			>
				{index === 20 ? 'Click Me' : `Item ${index}`}
			</ImageItem>
		);
	};

	handleClick = (ev) => {
		if (ev.currentTarget.dataset.index === '20') {
			this.setState({dataSize: 0});
		}
	};

	cbScrollTo = (fn) => {
		this.scrollTo = fn;
	};

	render () {
		return (
			<Panels {...this.props} >
				<Panel>
					<VirtualGridList
						cbScrollTo={this.cbScrollTo}
						dataSize={this.state.dataSize}
						itemSize={{
							minWidth: ri.scale(250),
							minHeight: ri.scale(250)
						}}
						itemRenderer={this.renderItem}
						style={{width: ri.scale(1200) + 'px', height: ri.scale(760) + 'px'}}
					/>
				</Panel>
			</Panels>
		);
	}
}

export default ThemeDecorator(App);
