import React from 'react';
import {storiesOf} from '@storybook/react';

import MediaPlayer from '@enact/agate/MediaPlayer';

const audioFiles = [
	'https://www.w3schools.com/tags/horse.ogg',
	'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
];

storiesOf('Agate', module)
	.add(
		'AudioPlayer',
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
				text: 'The basic AudioPlayer'
			}
		}
	);

storiesOf('Agate', module)
	.add(
		'VideoPlayer',
		() => {
			return (
				<MediaPlayer mediaComponent="video">
					<source src="http://media.w3.org/2010/05/sintel/trailer.mp4" />
				</MediaPlayer>
			);
		},
		{
			info: {
				text: 'The basic VideoPlayer'
			}
		}
	);
