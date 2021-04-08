import MediaPlayer from '../../../../MediaPlayer';

const MediaPlayerTests = [
	<MediaPlayer>
		<source src="https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3" type="audio/mp3" />
	</MediaPlayer>,
	<MediaPlayer disabled>
		<source src="https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3" type="audio/mp3" />
	</MediaPlayer>,
	<MediaPlayer paused>
		<source src="https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3" type="audio/mp3" />
	</MediaPlayer>,
	<MediaPlayer shuffle>
		<source src="https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3" type="audio/mp3" />
	</MediaPlayer>
];

export default MediaPlayerTests;
