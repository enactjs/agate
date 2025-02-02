import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {createRef, Component} from 'react';

import {Button} from '../../../../../Button';
import Input from '../../../../../Input';
import ImageItem from '../../../../../ImageItem';
import {VirtualGridList} from '../../../../../VirtualList';
import ThemeDecorator from '../../../../../ThemeDecorator';

const ListContainer = SpotlightContainerDecorator('div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const getScrollbarVisibility = (hidden) => hidden ? 'hidden' : 'visible';

// NOTE: Forcing pointer mode off, so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = [];

const renderItem = ({index, ...rest}) => {
	const {source, subText, text} = items[index];
	return (
		<ImageItem
			{...rest}
			id={`item${index}`}
			label={subText}
			src={source}
			style={{margin: 0}}
		>
			{text}
		</ImageItem>
	);
};

const updateData = (dataSize, noLabel) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = (headingZeros + i).slice(-itemNumberDigits),
			text = `Item ${count}`,
			subText = `SubItem ${count}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = {
				'hd': `https://placehold.co/200x200/${color}/ffffff/png?text=Image+${i}`,
				'fhd': `https://placehold.co/300x300/${color}/ffffff/png?text=Image+${i}`,
				'uhd': `https://placehold.co/600x600/${color}/ffffff/png?text=Image+${i}`
			};

		if (noLabel) {
			items.push({source});
		} else {
			items.push({text, subText, source});
		}
	}

	return dataSize;
};

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			hideScrollbar: false,
			horizontal: false,
			noLabel: false,
			numItems: 100,
			minHeight: 270,
			minWidth: 450,
			spacing: 24,
			spotlightDisabled: false,
			translate: false,
			wrap: false
		};
		this.rootRef = createRef();
		this.scrollingRef = createRef();
		updateData(this.state.numItems, this.state.noLabel);
	}

	onKeyDown = () => {
		if (this.rootRef.current.dataset.keydownEvents) {
			this.rootRef.current.dataset.keydownEvents = Number(this.rootRef.current.dataset.keydownEvents) + 1;
		} else {
			this.rootRef.current.dataset.keydownEvents = 1;
		}
	};

	onScrollStart = () => {
		this.scrollingRef.current.innerHTML = 'Scrolling';
	};

	onScrollStop = () => {
		this.scrollingRef.current.innerHTML = 'Not Scrolling';
	};

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	};

	onToggleLabel = () => {
		updateData(this.state.numItems, !this.state.noLabel);
		this.setState((state) => ({noLabel: !state.noLabel}));
	};

	onChangeNumItems = ({value}) => {
		this.setState({numItems: value});
		updateData(value);
	};

	onChangeSpacing = (obj) => {
		this.setState({spacing: obj.value});
	};

	onChangeWidth = ({value}) => {
		this.setState({minWidth: value});
	};

	onChangeHeight = ({value}) => {
		this.setState({minHeight: value});
	};

	render () {
		const
			inputStyle = {width: ri.scaleToRem(300)},
			{hideScrollbar, horizontal, noLabel, numItems, minHeight, minWidth, spacing, spotlightDisabled, translate, wrap} = this.state;
		return (
			<div {...this.props} id="list" ref={this.rootRef}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<Button id="hideScrollbar" onClick={this.onToggle} selected={hideScrollbar} size="small">hide scrollbar</Button>
						<Button id="wrap" onClick={this.onToggle} selected={wrap} size="small">wrap</Button>
						<Button id="horizontal" onClick={this.onToggle} selected={horizontal} size="small">directionChange</Button>
						<Button id="noLabel" onClick={this.onToggleLabel} selected={noLabel} size="small">Media item</Button>
						<Button id="translate" onClick={this.onToggle} selected={translate} size="small">translate Mode</Button>
						<Button id="spotlightDisabled" onClick={this.onToggle} selected={spotlightDisabled} size="small"> spotlightDisabled</Button>
						<span id="scrolling" ref={this.scrollingRef}>Not Scrolling</span>
						<div>
							<div style={{display:'inline-block'}}>
								Number of items:
								<Input id="numItems" defaultValue={numItems} type="number" onChange={this.onChangeNumItems} size="small" style={inputStyle} />
							</div>
							<div style={{display:'inline-block'}}>
								Item spacing:
								<Input id="spacing" defaultValue={spacing} type="number" onChange={this.onChangeSpacing} size="small" style={inputStyle} />
							</div>
							<div style={{display:'inline-block'}}>
								Min width:
								<Input id="minWidth" defaultValue={minWidth} type="number" onChange={this.onChangeWidth} size="small" style={inputStyle} />
							</div>
							<div style={{display:'inline-block'}}>
								Min height:
								<Input id="minHeight" defaultValue={minHeight} type="number" onChange={this.onChangeHeight} size="small" style={inputStyle} />
							</div>
						</div>
					</Cell>
					<Cell component={ListContainer}>
						<Row align="center">
							<Cell align="stretch">
								<Column align="center">
									<Cell>
										<VirtualGridList
											dataSize={numItems}
											direction={(horizontal ? 'horizontal' : 'vertical')}
											horizontalScrollbar={getScrollbarVisibility(hideScrollbar)}
											itemRenderer={renderItem}
											itemSize={{
												minHeight: ri.scale(minHeight),
												minWidth: ri.scale(minWidth)
											}}
											key={(translate ? 'translate' : 'native')}
											onKeyDown={this.onKeyDown}
											onScrollStart={this.onScrollStart}
											onScrollStop={this.onScrollStop}
											scrollMode={(translate ? 'translate' : 'native')}
											spacing={ri.scale(spacing)}
											spotlightDisabled={spotlightDisabled}
											style={{height: ri.scaleToRem(minHeight * 3)}}
											verticalScrollbar={getScrollbarVisibility(hideScrollbar)}
											wrap={wrap}
										/>
									</Cell>
								</Column>
							</Cell>
						</Row>
					</Cell>
				</Column>
			</div>
		);
	}
}

export default ThemeDecorator(app);
