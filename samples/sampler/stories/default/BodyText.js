import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UiBodyText from '@enact/ui/BodyText';
import BodyText, {BodyTextBase} from '@enact/agate/BodyText';

BodyText.displayName = 'BodyText';
const Config = mergeComponentMetadata('BodyText', UiBodyText, BodyText, BodyTextBase);

const prop = {
	sizes: ['', 'large', 'small']
};

export default {
	title: 'Agate/BodyText',
	component: 'BodyText'
};

export const _BodyText = (args) => (
	<BodyText
		centered={args['centered']}
		noWrap={args['noWrap']}
		size={args['size']}
	>
		{args['children']}
	</BodyText>
);

boolean('centered', _BodyText, Config);
boolean('noWrap', _BodyText, Config);
select('size', _BodyText, ['', 'large', 'small'], Config);
text('children', _BodyText, Config, 'This is Body Text');

_BodyText.storyName = 'BodyText';
_BodyText.parameters = {
	info: {
		text: 'The basic Body Text'
	}
};
