import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Input, InputBase} from '@enact/agate/Input';

import {iconList} from './util/icons';

const iconNames = ['', ...iconList];

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);
const prop = {
	type: ['text', 'password', 'number']
};

export default {
	title: 'Agate/Input',
	component: 'Input'
};

export const _Input = (args) => (
	<Input
		autoFocus={args['autoFocus']}
		clearButton={args['clearButton']}
		clearIcon={args['clearIcon']}
		disabled={args['disabled']}
		dismissOnEnter={args['dismissOnEnter']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		onBeforeChange={action('onBeforeChange')}
		onBlur={action('onBlur')}
		onChange={action('onChange')}
		onFocus={action('onFocus')}
		placeholder={args['placeholder']}
		size={args['size']}
		type={args['type']}
	/>
);
boolean('autoFocus', _Input, Config);
boolean('clearButton', _Input, Config);
select('clearIcon', _Input, iconNames, Config);
boolean('disabled', _Input, Config);
boolean('dismissOnEnter', _Input, Config);
select('iconAfter', _Input, iconNames, Config);
select('iconBefore', _Input, iconNames, Config);
boolean('invalid', _Input, Config);
text('invalidMessage', _Input, Config);
text('placeholder', _Input, Config, 'Input text here');
select('size', _Input, ['small', 'large'], Config, 'large');
select('type', _Input, prop.type, Config);
_Input.storyName = 'Input';
_Input.parameters = {
	info: {
		text: 'The basic Input'
	}
};
