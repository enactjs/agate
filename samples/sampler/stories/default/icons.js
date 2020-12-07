// Icons For Samples
//
// Grouped into logical sets for easy consumption.
//

import {icons, iconsSilicon} from '@enact/agate/Icon';

const decrementIcons = [
	'minus',
	'minusbold',
	'arrowlargedown',
	'arrowlargeleft',
	'arrowleftturn',
	'previoustrack'
];

const incrementIcons = [
	'plus',
	'plusbold',
	'arrowlargeup',
	'arrowlargeright',
	'arrowrightturn',
	'nexttrack'
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

const iconList = Object.keys(icons).sort();
const iconListSilicon = Object.keys(iconsSilicon).sort();

export default iconList;
export {decrementIcons, iconList, iconListSilicon, incrementIcons, listIcons, mediaIcons, arrowIcons, starIcons};
