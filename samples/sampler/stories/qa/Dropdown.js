import Button from '@enact/agate/Button';
import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';
import Heading from '@enact/agate/Heading';
import Scroller from '@enact/agate/Scroller';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, range, select, text} from '@enact/storybook-utils/addons/controls';
import Group from '@enact/ui/Group';
import {useCallback, useState} from 'react';

Dropdown.displayName = 'Dropdown';
const Config = mergeComponentMetadata('Dropdown', Dropdown, DropdownBase);
const items = (itemCount, optionText = 'Option') => (new Array(itemCount)).fill().map((i, index) => `${optionText} ${index + 1}`);

const list = [
	{children: 'hello 1', 'key': 'key1', 'aria-label': 'aria 1'},
	{children: 'hello 2', 'key': 'key2', 'aria-label': 'aria 2', disabled: true},
	{children: 'hello 3', 'key': 'key3', 'aria-label': 'aria 3'}
];

const AutoDismissDropdown = () => {
	const [open, setOpen] = useState(true);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	return (
		<div>
			<Heading>Click in the blank area of the viewport to dismiss the Dropdown</Heading>
			<Dropdown
				onClose={handleClose}
				onOpen={handleOpen}
				open={open} // initial value is true
			>
				{['test1', 'test2', 'test3']}
			</Dropdown>
		</div>
	);
};

const DisabledDropdown = () => {
	const [isDisabled, setIsDisabled] = useState(true);

	const handleClick = useCallback(() => {
		setIsDisabled(!isDisabled);
	}, [isDisabled]);

	return (
		<div>
			<Button onClick={handleClick}>{isDisabled ? 'Enable dropdown' : 'Disable dropdown'}</Button>
			<Dropdown disabled={isDisabled} title="hello">
				{['a', 'b', 'c']}
			</Dropdown>
		</div>
	);
};

export default {
	title: 'Agate/Dropdown',
	component: 'Dropdown'
};

export const With2OptionsForTestingDirection = (args) => (
	<Dropdown
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
		title={args['title']}
		width={args['width']}
	>
		{['Option 1', 'Option 2']}
	</Dropdown>
);

select('direction', With2OptionsForTestingDirection, ['above', 'below'], Config);
boolean('disabled', With2OptionsForTestingDirection, Config);
text('title', With2OptionsForTestingDirection, Config, 'Dropdown');
select('width', With2OptionsForTestingDirection, ['smallest', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

With2OptionsForTestingDirection.storyName = 'with 2 options for testing direction';

export const WithDefaultSelectedIn30Options = (args) => (
	<Dropdown
		defaultSelected={10}
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		title={args['title']}
		width={args['width']}
	>
		{items(30)}
	</Dropdown>
);

select('direction', WithDefaultSelectedIn30Options, ['above', 'below'], Config);
boolean('disabled', WithDefaultSelectedIn30Options, Config);
text('title', WithDefaultSelectedIn30Options, Config, 'Dropdown');
select('width', WithDefaultSelectedIn30Options, ['smallest', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithDefaultSelectedIn30Options.storyName = 'with defaultSelected in 30 options';

export const WithLongText = (args) => (
	<Dropdown
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		title={args['title']}
		width={args['width']}
	>
		{items(10, 'Looooooooooooooooooooooong')}
	</Dropdown>
);

select('direction', WithLongText, ['above', 'below'], Config);
boolean('disabled', WithLongText, Config);
text('title', WithLongText, Config, 'Dropdown');
select('width', WithLongText, ['smallest', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithLongText.storyName = 'with long text';

export const WithMultipleDropdowns = (args) => (
	<div>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			title={args['title']}
			width={args['width']}
		>
			{items(5)}
		</Dropdown>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			title={args['title']}
			width={args['width']}
		>
			{items(5)}
		</Dropdown>
	</div>
);

select('direction', WithMultipleDropdowns, ['above', 'below'], Config);
boolean('disabled', WithMultipleDropdowns, Config);
text('title', WithMultipleDropdowns, Config, 'Dropdown');
select('width', WithMultipleDropdowns, ['smallest', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithMultipleDropdowns.storyName = 'with multiple dropdowns';

export const WithArrayOfChildrenObjects = (args) => (
	<div>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
			title={args['title']}
			width={args['width']}
		>
			{list}
		</Dropdown>
	</div>
);

select('direction', WithArrayOfChildrenObjects, ['above', 'below'], Config);
boolean('disabled', WithArrayOfChildrenObjects, Config);
text('title', WithArrayOfChildrenObjects, Config, 'Dropdown');
select('width', WithArrayOfChildrenObjects, ['smallest', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithArrayOfChildrenObjects.storyName = 'with array of children objects';

export const WithAutoDismiss = () => <AutoDismissDropdown />;

WithAutoDismiss.storyName = 'with auto dismiss';

export const WithDisabled = () => <DisabledDropdown />;

WithDisabled.storyName = 'with disabled';

export const WithGroupInScroller = (args) => {
	const itemCount = args['items'];
	const itemList = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);
	const dropdowns = [];

	for (let i = 0; i < 30; i++) {
		dropdowns.push({children: itemList, title: args['title'], key: i});
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
};

range('items', WithGroupInScroller, Config, {range: true, min: 0, max: 50}, 5);
text('title', WithGroupInScroller, Config, 'Please select');

WithGroupInScroller.storyName = 'with group in Scroller';
