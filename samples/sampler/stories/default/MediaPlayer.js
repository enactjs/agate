import React from 'react';
import {storiesOf} from '@storybook/react';

import MediaPlayer from '@enact/agate/MediaPlayer';

storiesOf('Agate', module)
	.add(
		'MediaPlayer',
		() => {
			return (
				<MediaPlayer>
					<source src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3" type="audio/mp3" />
				</MediaPlayer>
			);
		},
		{
			info: {
				text: 'The basic AudioPlayer'
			}
		}
	);