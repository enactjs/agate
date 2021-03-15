import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import Popup from '@enact/agate/Popup';

import Section from '../components/Section';
import useBoolArray from '../components/useBoolArray';

const PopupView = () => {
	const [open, handleOpen] = useBoolArray(1);

	return (
		<>
			<Section title="Default">
				<Button alt="Normal" onClick={handleOpen(0, true)}>Open 0</Button>
			</Section>

			<Popup
				onClose={handleOpen(0, false)}
				open={open[0]}
			>
				<BodyText>Text</BodyText>
				<Button onClick={handleOpen(0, false)}>Close</Button>
			</Popup>
		</>
	);
};

export default PopupView;
