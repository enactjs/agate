import Group from '@enact/ui/Group';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select, text} from  '@enact/storybook-utils/addons/knobs';
import {action} from '@enact/storybook-utils/addons/actions';
import {Component} from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';
import Heading from '@enact/agate/Heading';
import Scroller from '@enact/agate/Scroller';

const Config = mergeComponentMetadata('Dropdown', Dropdown, DropdownBase);
const items = (itemCount, optionText = 'Option') => (new Array(itemCount)).fill().map((i, index) => `${optionText} ${index + 1}`);
Dropdown.displayName = 'Dropdown';

const list = [
	{children: 'hello 1', 'key': 'key1', 'aria-label': 'aria 1'},
	{children: 'hello 2', 'key': 'key2', 'aria-label': 'aria 2', disabled: true},
	{children: 'hello 3', 'key': 'key3', 'aria-label': 'aria 3'}
];

class AutoDismissDropdown extends Component {
	constructor (props) {
		super(props);
		this.state = {
			open: true
		};
	}

	handleClose = () => {
		this.setState({open: false});
	};

	handleOpen = () => {
		this.setState({open: true});
	};

	render () {
		return (
			<div>
				<Heading>Click in the blank area of the viewport to dismiss the Dropdown</Heading>
				<Dropdown
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					open={this.state.open} // initial value is true
				>
					{['test1', 'test2', 'test3']}
				</Dropdown>
			</div>
		);
	}
}

class DisabledDropdown extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isDisabled: true
		};
	}

	handleClick = () => {
		if (this.state.isDisabled) {
			this.setState({isDisabled: false});
		} else {
			this.setState({isDisabled: true});
		}
	};

	render () {
		return (
			<div>
				<Button onClick={this.handleClick}>{this.state.isDisabled ? 'Enable dropdown' : 'Disable dropdown'}</Button>
				<Dropdown title="hello" disabled={this.state.isDisabled} onFocus={this.handleFocus}>
					{['a', 'b', 'c']}
				</Dropdown>
			</div>
		);
	}
}

storiesOf('Dropdown', module)
	.add(
		'with 2 options for testing direction',
		() => (
			<Dropdown
				direction={select('direction', ['above', 'below'], Config)}
				disabled={boolean('disabled', Config)}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				onSelect={action('onSelect')}
				style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
				title={text('title', Config, 'Dropdown')}
				width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
			>
				{['Option 1', 'Option 2']}
			</Dropdown>
		)
	).add(
		'with defaultSelected in 30 options',
		() => (
			<Dropdown
				defaultSelected={10}
				direction={select('direction', ['above', 'below'], Config)}
				disabled={boolean('disabled', Config)}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				onSelect={action('onSelect')}
				title={text('title', Config, 'Dropdown')}
				width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
			>
				{items(30)}
			</Dropdown>
		)
	).add(
		'with long text',
		() => (
			<Dropdown
				direction={select('direction', ['above', 'below'], Config)}
				disabled={boolean('disabled', Config)}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				onSelect={action('onSelect')}
				title={text('title', Config, 'Dropdown')}
				width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
			>
				{items(10, 'Looooooooooooooooooooooong')}
			</Dropdown>
		)
	).add(
		'with multiple dropdowns',
		() => (
			<div>
				<Dropdown
					direction={select('direction', ['above', 'below'], Config)}
					disabled={boolean('disabled', Config)}
					onClose={action('onClose')}
					onOpen={action('onOpen')}
					onSelect={action('onSelect')}
					title={text('title', Config, 'Dropdown')}
					width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
				>
					{items(5)}
				</Dropdown>
				<Dropdown
					direction={select('direction', ['above', 'below'], Config)}
					disabled={boolean('disabled', Config)}
					onClose={action('onClose')}
					onOpen={action('onOpen')}
					onSelect={action('onSelect')}
					title={text('title', Config, 'Dropdown')}
					width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
				>
					{items(5)}
				</Dropdown>
			</div>
		)
	).add(
		'with array of children objects',
		() => (
			<div>
				<Dropdown
					direction={select('direction', ['above', 'below'], Config)}
					disabled={boolean('disabled', Config)}
					onClose={action('onClose')}
					onOpen={action('onOpen')}
					onSelect={action('onSelect')}
					style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
					title={text('title', Config, 'Dropdown')}
					width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
				>
					{list}
				</Dropdown>
			</div>
		)
	).add(
		'with auto dismiss',
		() => (
			<AutoDismissDropdown />
		)
	).add(
		'with disabled',
		() => (
			<DisabledDropdown />
		)
	).add(
		'with Group in Scroller',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
			const itemList = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);
			const dropdowns = [];

			for (let i = 0; i < 30; i++) {
				dropdowns.push({children: itemList, title: text('title', Config, 'Please select'), key: i});
			}

			return (
				<Scroller>
					<Group
						childComponent={Dropdown}
						style={{position: 'absolute', top: 0, width:'50%'}}
						onSelect={action('onSelect')}
					>
						{dropdowns}
					</Group>
				</Scroller>
			);
		}
	);
