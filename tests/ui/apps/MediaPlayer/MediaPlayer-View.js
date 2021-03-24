import Heading from '../../../../Heading';
import MediaPlayer from '../../../../MediaPlayer';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const audioFiles = [
	'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3',
	'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Oceanic-Dawn-160.mp3',
	'https://sampleswap.org/mp3/artist/26546/benzoul_lovevoodoo-160.mp3',
	'https://sampleswap.org/mp3/artist/19139/MarkNine_In-my-Place-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3'
];

const app = (props) => <div {...props}>
	<div style={{display: 'inline-block', marginTop: '40px', width: '50%'}}>
		<Heading size="tiny">Media Player Default</Heading>
		<MediaPlayer id="mediaPlayerDefault">
			{
				audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
			}
		</MediaPlayer>
	</div>
	<div style={{display: 'inline-block', marginTop: '40px', width: '50%'}}>
		<Heading size="tiny">Media Player Disabled</Heading>
		<MediaPlayer id="mediaPlayerDisabled" disabled>
			{
				audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
			}
		</MediaPlayer>
	</div>
	<div style={{display: 'inline-block', marginTop: '80px', width: '50%'}}>
		<Heading size="tiny">Media Player SpotlightDisabled</Heading>
		<MediaPlayer id="mediaPlayerSpotlightDisabled" spotlightDisabled>
			{
				audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
			}
		</MediaPlayer>
	</div>
	<div style={{display: 'inline-block', marginTop: '80px', width: '50%'}}>
		<Heading size="tiny">Media Player Light</Heading>
		<MediaPlayer id="mediaPlayerLight" type="light">
			{
				audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
			}
		</MediaPlayer>
	</div>
</div>;

export default ThemeDecorator(app);
