// Icons For Samples
//
// Grouped into logical sets for easy consumption.
//

import {icons} from '@enact/agate/Icon';

const decrementIcons = [
	'minus',
	'arrowlargedown',
	'arrowlargeleft',
	'arrowsmalldown',
	'arrowsmallleft',
	'arrowhookright',
	'backward',
	'skipbackward',
	'pausebackward',
	'pausejumpbackward',
	'jumpbackward',
	'rollbackward',
	'arrowshrink',
	'back15'
];

const incrementIcons = [
	'plus',
	'arrowlargeup',
	'arrowlargeright',
	'arrowsmallup',
	'arrowsmallright',
	'arrowhookleft',
	'forward',
	'skipforward',
	'pauseforward',
	'pausejumpforward',
	'jumpforward',
	'rollforward',
	'arrowextend',
	'forward15'
];

const listIcons = [
	'denselist',
	'bulletlist',
	'list',
	'drawer',
	'playlist'
];

const mediaIcons = [
	'circle',
	'stop',
	'play',
	'pause',
	'forward',
	'backward',
	'skipforward',
	'skipbackward',
	'pauseforward',
	'pausebackward',
	'pausejumpforward',
	'pausejumpbackward',
	'resumeplay',
	'image',
	'audio',
	'music',
	'languages',
	'cc',
	'ccon',
	'ccoff',
	'sub',
	'recordings',
	'livezoom',
	'liveplayback',
	'liveplaybackoff',
	'repeat',
	'repeatoff',
	'series',
	'repeatdownload',
	'view360',
	'view360off',
	'info'
];

const arrowIcons = [
	'arrowlargedown',
	'arrowlargeup',
	'arrowlargeleft',
	'arrowlargeright',
	'arrowsmallup',
	'arrowsmalldown',
	'arrowsmallleft',
	'arrowsmallright'
];

const starIcons = [
	'star',
	'hollowstar',
	'halfstar'
];

export default Object.keys(icons).sort();
export {decrementIcons, incrementIcons, listIcons, mediaIcons, arrowIcons, starIcons};
