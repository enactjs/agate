import MediaPlayer from '../../../../MediaPlayer';

const audioFiles = [
	'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3',
	'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Oceanic-Dawn-160.mp3',
	'https://sampleswap.org/mp3/artist/26546/benzoul_lovevoodoo-160.mp3',
	'https://sampleswap.org/mp3/artist/19139/MarkNine_In-my-Place-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3'
];

const MediaPlayerTests = [
	<MediaPlayer>
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>,
	<MediaPlayer disabled>
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>,
	<MediaPlayer paused>
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>,
	<MediaPlayer shuffle>
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>,
	<MediaPlayer type="light">
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>,
	<MediaPlayer disabled type="light">
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>,
	<MediaPlayer paused type="light">
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>
];

export default MediaPlayerTests;
