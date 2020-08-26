import React from 'react';
import {storiesOf} from '@storybook/react';

import MediaPlayer from '@enact/agate/MediaPlayer';

storiesOf('Agate', module)
	.add(
		'AudioPlayer',
		() => {
			return (
				<MediaPlayer>
					{/* <source src="https://www.w3schools.com/tags/horse.ogg" type="audio/mp3" />*/}
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

storiesOf('Agate', module)
	.add(
		'VideoPlayer',
		() => {
			return (
				<MediaPlayer mediaComponent="video">
					<source src="http://media.w3.org/2010/05/sintel/trailer.mp4"  />
				</MediaPlayer>
			);
		},
		{
			info: {
				text: 'The basic VideoPlayer'
			}
		}
	);
