import React from 'react';
import {storiesOf} from '@storybook/react';

import MediaPlayer from '@enact/agate/MediaPlayer';

storiesOf('Agate', module)
	.add(
		'MediaPlayer',
		() => {
			return (
				<MediaPlayer />
			);
		},
		{
			text: 'The basic MediaPlayer'
		}
	);
