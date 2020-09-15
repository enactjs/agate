import React from 'react';
import {storiesOf} from '@storybook/react';

import MediaPlayer from '@enact/agate/MediaPlayer';

const audioFiles = [
	'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
];

storiesOf('Agate', module)
	.add(
		'MediaPlayer',
		() => {
			return (
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);
		},
		{
			info: {
				text: 'The basic MediaPlayer'
			}
		}
	);
