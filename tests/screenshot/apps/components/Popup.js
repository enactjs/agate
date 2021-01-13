import Popup from '../../../../Popup';
import React from 'react';

const PopupTests = [
	<Popup closeButton open>Popup!</Popup>,
	<Popup centered open>Popup!</Popup>,
	<Popup duration="medium" open>Popup!</Popup>,
	<Popup noAnimation open>Popup!</Popup>,
	<Popup open type="slide">Popup!</Popup>,
	<Popup open position="bottom">Popup!</Popup>,
	<Popup open position="fullscreen">Popup!</Popup>,
	<Popup open position="left">Popup!</Popup>,
	<Popup open position="right">Popup!</Popup>,
	<Popup open position="top">Popup!</Popup>
];

export default PopupTests;
