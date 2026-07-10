import Popup from '../../../../Popup';
import {Button} from '../../../../Button';
import {withConfig} from "./utils";

const children = (
	<>
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</>
);

const PopupSmokeTests = [
	<Popup open title="Title">Popup!</Popup>,
	<Popup open position="fullscreen" title="Title">Popup!</Popup>,
	<Popup open position="left" title="Title">Popup!</Popup>,
	<Popup open position="right" title="Title">Popup!</Popup>,
	<Popup open position="top" title="Title">Popup!</Popup>
];

const PopupAdditionalTests = [
	<Popup open>Popup!</Popup>,
	<Popup closeButton open>Popup!</Popup>,
	<Popup centered open>Popup!</Popup>,
	<Popup duration="medium" open>Popup!</Popup>,
	<Popup noAnimation open>Popup!</Popup>,
	<Popup open type="slide">Popup!</Popup>,
	<Popup open scrimType="none">Popup!</Popup>,
	<Popup open scrimType="transparent">Popup!</Popup>,
	<Popup open position="fullscreen">Popup!</Popup>,
	<Popup open position="left">Popup!</Popup>,
	<Popup open position="right">Popup!</Popup>,
	<Popup open position="top">Popup!</Popup>,

	// With children
	<Popup open>
		{children}
	</Popup>,
	<Popup open title="Title">
		{children}
	</Popup>,
	<Popup open position="bottom">
		{children}
	</Popup>,
	<Popup open position="fullscreen">
		{children}
	</Popup>,
	<Popup open position="fullscreen" title="Title">
		{children}
	</Popup>,
	<Popup open position="left">
		{children}
	</Popup>,
	<Popup open position="left" title="Title">
		{children}
	</Popup>,
	<Popup open position="right">
		{children}
	</Popup>,
	<Popup open position="right" title="Title">
		{children}
	</Popup>,
	<Popup open position="top">
		{children}
	</Popup>,
	<Popup open position="top" title="Title">
		{children}
	</Popup>
];

const PopupTests = [
	...PopupSmokeTests,
	...PopupAdditionalTests,
	...withConfig({locale: 'ar-SA'}, PopupSmokeTests) // locale = 'ar-SA'
];

export default PopupTests;
