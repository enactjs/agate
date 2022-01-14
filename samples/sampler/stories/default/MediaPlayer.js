import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import MediaPlayer from '@enact/agate/MediaPlayer';

MediaPlayer.displayname = 'MediaPlayer';
const Config = mergeComponentMetadata('MediaPlayer', MediaPlayer);

const audioFiles = [
	'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3',
	'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Oceanic-Dawn-160.mp3',
	'https://sampleswap.org/mp3/artist/26546/benzoul_lovevoodoo-160.mp3',
	'https://sampleswap.org/mp3/artist/19139/MarkNine_In-my-Place-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3'
];

export default {
	title: 'Agate/MediaPlayer',
	component: 'MediaPlayer'
};

export const _MediaPlayer = (args) => (
	<MediaPlayer
		disabled={args['disabled']}
		spotlightDisabled={args['spotlightDisabled']}
		type={args['type']}
	>
		{
			audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
		}
	</MediaPlayer>
);

boolean('disabled', _MediaPlayer, Config);
boolean('spotlightDisabled', _MediaPlayer, Config);
select('type', _MediaPlayer, ['full', 'tiny'], Config);

_MediaPlayer.storyName = 'MediaPlayer';
_MediaPlayer.parameters = {
	info: {
		text: 'The basic MediaPlayer'
	}
};
