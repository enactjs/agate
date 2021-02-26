import Button from '@enact/agate/Button';
import Heading from '@enact/agate/Heading';
import Popup from '@enact/agate/Popup';

import Section from '../components/Section';
import useBoolArray from '../components/useBoolArray';

import appCss from '../App/App.module.less';

const HeadingView = () => {
	const [open, handleOpen] = useBoolArray(2);

	return (
		<>
			<Section title="Default">
				<Button alt="Normal" onClick={handleOpen(0, true)}>Open 0</Button>
			</Section>
			<Section className={appCss.marginTop} title="Aria-labelled">
				<Button alt="Aria-labelled" onClick={handleOpen(1, true)}>Open 1</Button>
			</Section>

			<Popup
				onClose={handleOpen(0, false)}
				open={open[0]}
			>
				<Heading size="large" showLine>Text</Heading>
				<Button onClick={handleOpen(0, false)}>Close</Button>
			</Popup>

			<Popup
				onClose={handleOpen(1, false)}
				open={open[1]}
			>
				<Heading alt="Aria-labelled" aria-label="This is a Label." size="large" showLine>Text</Heading>
				<Button onClick={handleOpen(1, false)}>Close</Button>
			</Popup>
		</>
	);
};

export default HeadingView;
