import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';

import {Input, InputBase} from '@enact/agate/Input';

import {iconList} from './icons';

const iconNames = ['', ...iconList];

const Config = mergeComponentMetadata('Input', InputBase, Input);
const prop = {
	type: ['text', 'password', 'number']
};

export default {
	title: 'Agate/Input',
	component: 'Input'
};

export const _Input = () => (
	<Input
		autoFocus={boolean('autoFocus', Config)}
		disabled={boolean('disabled', Config)}
		dismissOnEnter={boolean('dismissOnEnter', Config)}
		iconAfter={select('iconAfter', iconNames, Config)}
		iconBefore={select('iconBefore', iconNames, Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		onBeforeChange={action('onBeforeChange')}
		onBlur={action('onBlur')}
		onChange={action('onChange')}
		onFocus={action('onFocus')}
		placeholder={text('placeholder', Config, 'Input text here')}
		size={select('size', ['small', 'large'], Config, 'large')}
		type={select('type', prop.type, Config)}
	/>
);

_Input.storyName = 'Input';
_Input.parameters = {
	info: {
		text: 'The basic Input'
	}
};
