import Button from '@enact/agate/Button';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ButtonView = () => (
	<>
		<Section title="Default">
			<Button alt="No content" />
			<Button alt="Normal">Text 0</Button>
			<Button alt="With icon" icon="plus">Text 1</Button>
			<Button alt="Disabled" disabled>Text 2</Button>
			<Button alt="Disabled With icon" disabled icon="plus">Text 3</Button>
		</Section>

		<Section className={appCss.marginTop} title="With only Icon">
			<Button alt="With Icon" icon="plus" />
			<Button alt="Disabled with Icon" disabled icon="plus" />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Button alt="Aria-labelled" aria-label="This is a Label 0.">Text 0</Button>
			<Button alt="Aria-labelled with icon" aria-label="This is a Label 1." icon="plus">Text 1</Button>
			<Button alt="Aria-labelled and Disabled" aria-label="This is a Label 2." disabled>Text 2</Button>
			<Button alt="Aria-labelled and Disabled with color icon" aria-label="This is a Label 3." icon="plus" disabled>Text 3</Button>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled with only Icon">
			<Button alt="Aria-labelled" aria-label="This is an icon 0." icon="plus" />
			<Button alt="Aria-labelled and Disabled" aria-label="This is an icon 1." disabled icon="plus" />
		</Section>
	</>
);

export default ButtonView;
