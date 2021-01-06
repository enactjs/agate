import Popup from '../../../../Popup';
import React from 'react';

const PopupTests = [
	<Popup closeButton open>Popup!</Popup>,
	<Popup centered open>Popup!</Popup>,
	<Popup open duration="short">Popup!</Popup>,
	<Popup open noAnimation>Popup!</Popup>,
	<Popup open type="fade">Popup!</Popup>,
	<Popup open position="bottom">Popup!</Popup>,
	<Popup open position="center">Popup!</Popup>,
	<Popup open position="fullscreen">Popup!</Popup>,
	<Popup open position="left">Popup!</Popup>,
	<Popup open position="right">Popup!</Popup>,
	<Popup open position="top">Popup!</Popup>
];

export default PopupTests;
