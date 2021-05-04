import Popup from '../../../../Popup';
import {Button} from "../../../../Button";

const PopupTests = [
	<Popup open>Popup!</Popup>,
	<Popup closeButton open>Popup!</Popup>,
	<Popup centered open>Popup!</Popup>,
	<Popup duration="medium" open>Popup!</Popup>,
	<Popup noAnimation open>Popup!</Popup>,
	<Popup open type="slide">Popup!</Popup>,
	<Popup open position="bottom">Popup!</Popup>,
	<Popup open position="fullscreen">Popup!</Popup>,
	<Popup open position="left">Popup!</Popup>,
	<Popup open position="right">Popup!</Popup>,
	<Popup open position="top">Popup!</Popup>,
	<Popup open>
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>
];

export default PopupTests;
