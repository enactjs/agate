import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import FullscreenPopup from '@enact/agate/FullscreenPopup';
import React from 'react';

import Section from '../components/Section';
import useBoolArray from '../components/useBoolArray';

const PopupView = () => {
	const [open, handleOpen] = useBoolArray(12);

	return (
		<>
			<Section title="Default">
				<Button alt="Normal" onClick={handleOpen(0, true)}>Open 0</Button>
				<Button alt="With noAnimation" onClick={handleOpen(1, true)}>Open 1</Button>
				<Button alt="With 'clip' type" onClick={handleOpen(2, true)}>Open 2</Button>
				<Button alt="With 'fade' type" onClick={handleOpen(3, true)}>Open 3</Button>
				<Button alt="With 'slide' type" onClick={handleOpen(4, true)}>Open 4</Button>
				<Button alt="Disabled" onClick={handleOpen(5, true)}>Open 5</Button>
			</Section>

			<Section title="Aria-labelled">
				<Button alt="Aria-labelled" onClick={handleOpen(6, true)}>Open 6</Button>
				<Button alt="Aria-labelled with noAnimation" onClick={handleOpen(7, true)}>Open 7</Button>
				<Button alt="Aria-labelled with 'clip' type" onClick={handleOpen(8, true)}>Open 8</Button>
				<Button alt="Aria-labelled with 'fade' type" onClick={handleOpen(9, true)}>Open 9</Button>
				<Button alt="Aria-labelled with 'slide' type" onClick={handleOpen(10, true)}>Open 10</Button>
				<Button alt="Aria-labelled and Disabled" onClick={handleOpen(11, true)}>Open 11</Button>
			</Section>

			<FullscreenPopup
				open={open[0]}
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(0, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				noAnimation
				open={open[1]}
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(1, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				open={open[2]}
				type="clip"
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(2, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				open={open[3]}
				type="fade"
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(3, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				open={open[4]}
				type="slide"
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(4, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				disabled
				open={open[5]}
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(5, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				aria-label="This is a Label."
				open={open[6]}
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(6, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				aria-label="This is a Label."
				noAnimation
				open={open[7]}
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(7, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				aria-label="This is a Label."
				open={open[8]}
				type="clip"
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(8, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				aria-label="This is a Label."
				open={open[9]}
				type="fade"
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(9, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				aria-label="This is a Label."
				open={open[10]}
				type="slide"
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(10, false)}>Click me</Button>
			</FullscreenPopup>

			<FullscreenPopup
				aria-label="This is a Label."
				disabled
				open={open[11]}
			>
				<BodyText>Hello</BodyText>
				<Button size="small" onClick={handleOpen(11, false)}>Click me</Button>
			</FullscreenPopup>
		</>
	);
};

export default PopupView;
