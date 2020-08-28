import React from 'react';
import {storiesOf} from '@storybook/react';

import MediaPlayer from '@enact/agate/MediaPlayer';

const sources = [
	'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
	'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3'
];

let songIndex = 0;
console.log(songIndex);

const clickNext = () => {
	if (songIndex < sources.length - 1) {
		songIndex++;
		console.log(songIndex);
	} else {
		return null
	}
}


storiesOf('Agate', module)
	.add(
		'AudioPlayer',
		() => {
			return (
				<div>
					<MediaPlayer>
						{/* <source src="https://www.w3schools.com/tags/horse.ogg" type="audio/mp3" />*/}
						{/*<source src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3" type="audio/mp3" />*/}
						<source src={sources[songIndex]} type="audio/mp3"/>
					</MediaPlayer>
					<button style={{position: 'absolute', top: 300}} onClick={clickNext}>Click next</button>
				</div>
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
