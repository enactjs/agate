import Heading from '../../../../Heading';
import MediaPlayer from '../../../../MediaPlayer';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import {scaleToRem} from '@enact/ui/resolution';

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

const app = (props) =>
	<Scroller style={{height: scaleToRem(900)}}>
		<div {...props}>
			<div style={{marginTop: '40px'}}>
				<Heading>Media Player Default</Heading>
				<MediaPlayer id="mediaPlayerDefault">
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			</div>
			<div style={{marginTop: '80px'}}>
				<Heading>Media Player Disabled</Heading>
				<MediaPlayer id="mediaPlayerDisabled" disabled>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			</div>
			<div style={{marginTop: '80px'}}>
				<Heading>Media Player SpotlightDisabled</Heading>
				<MediaPlayer id="mediaPlayerSpotlightDisabled" spotlightDisabled>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			</div>
			<div style={{marginTop: '80px'}}>
				<Heading>Media Player Light</Heading>
				<MediaPlayer id="mediaPlayerLight">
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			</div>
		</div>;
	</Scroller>;

export default ThemeDecorator(app);
