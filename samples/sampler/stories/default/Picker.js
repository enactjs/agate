import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import {DrumPickerBase} from '@enact/agate/internal/DrumPicker';
import Picker from '@enact/agate/Picker';

const Config = mergeComponentMetadata('Picker', Picker, DrumPickerBase);

storiesOf('Agate', module)
	.add(
		'Picker',
		() => (
			<Picker
				aria-label={text('aria-label', Config, '')}
				decrementAriaLabel={text('decrementAriaLabel', Config, '')}
				disabled={boolean('disabled', Config)}
				incrementAriaLabel={text('incrementAriaLabel', Config, '')}
				noAnimation={boolean('noAnimation', Config)}
				onChange={action('onChange')}
				orientation={select('orientation', ['vertical', 'horizontal'], Config)}
				spotlightDisabled={boolean('spotlightDisabled', Config)}
				wrap={boolean('wrap', Config)}
			>
				{['LO', '16\xB0', '17\xB0', '18\xB0', '19\xB0', 'HI']}
			</Picker>
		),
		{
			text: 'Basic usage of Picker'
		}
	);
