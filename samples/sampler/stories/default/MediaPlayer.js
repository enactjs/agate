import React from 'react';
import {storiesOf} from '@storybook/react';

import MediaPlayer from '@enact/agate/MediaPlayer';

storiesOf('Agate', module)
	.add(
		'MediaPlayer',
		() => {
			return (
				<MediaPlayer>
					<source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
				</MediaPlayer>
			);
		},
		{
			info: {
				text: 'The basic MediaPlayer'
			}
		}
	);
