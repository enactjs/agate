import Popup from '../../../../Popup';
import {Button} from '../../../../Button';

const PopupTests = [
	<Popup open>Popup!</Popup>,
	<Popup closeButton open>Popup!</Popup>,
	<Popup centered open>Popup!</Popup>,
	<Popup duration="medium" open>Popup!</Popup>,
	<Popup noAnimation open>Popup!</Popup>,
	<Popup open type="slide">Popup!</Popup>,
	<Popup open scrimType="none">Popup!</Popup>,
	<Popup open scrimType="transparent">Popup!</Popup>,
	<Popup open title="Title">Popup!</Popup>,
	<Popup open position="fullscreen">Popup!</Popup>,
	<Popup open position="fullscreen" title="Title">Popup!</Popup>,
	<Popup open position="left">Popup!</Popup>,
	<Popup open position="left" title="Title">Popup!</Popup>,
	<Popup open position="right">Popup!</Popup>,
	<Popup open position="right" title="Title">Popup!</Popup>,
	<Popup open position="top">Popup!</Popup>,
	<Popup open position="top" title="Title">Popup!</Popup>,
	<Popup open>
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open title="Title">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="bottom">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="fullscreen">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="fullscreen" title="Title">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="left">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="left" title="Title">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="right">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="right" title="Title">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="top">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,
	<Popup open position="top" title="Title">
		Popup!
		<buttons>
			<Button>OK</Button>
			<Button>Cancel</Button>
		</buttons>
	</Popup>,

	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <Popup open title="Title">Popup!</Popup>
	},
	{
		locale: 'ar-SA',
		component: <Popup open position="fullscreen" title="Title">Popup!</Popup>
	},
	{
		locale: 'ar-SA',
		component: <Popup open position="left" title="Title">Popup!</Popup>
	},
	{
		locale: 'ar-SA',
		component: <Popup open position="right" title="Title">Popup!</Popup>
	},
	{
		locale: 'ar-SA',
		component: <Popup open position="top" title="Title">Popup!</Popup>
	}
];

export default PopupTests;
