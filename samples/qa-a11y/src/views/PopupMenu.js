import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import PopupMenu from '@enact/agate/PopupMenu';

import Section from '../components/Section';
import useBoolArray from '../components/useBoolArray';

const PopupMenuView = () => {
	const [open, handleOpen] = useBoolArray(6);

	return (
		<>
			<Section title="Default">
				<Button alt="Normal" onClick={handleOpen(0, true)}>Open 0</Button>
				<Button alt="With a Title" onClick={handleOpen(1, true)}>Open 1</Button>
				<Button alt="Disabled with a Title" onClick={handleOpen(2, true)}>Open 2</Button>
			</Section>

			<Section title="Aria-labelled">
				<Button alt="Aria-lablled" onClick={handleOpen(3, true)}>Open 3</Button>
				<Button alt="Aria-lablled with a Title" onClick={handleOpen(4, true)}>Open 4</Button>
				<Button alt="Aria-lablled and Disabled with a Title" onClick={handleOpen(5, true)}>Open 5</Button>
			</Section>

			<PopupMenu
				onClose={handleOpen(0, false)}
				open={open[0]}
			>
				<BodyText>Hello</BodyText>
				<Button onClick={handleOpen(0, false)}>Close</Button>
			</PopupMenu>

			<PopupMenu
				onClose={handleOpen(1, false)}
				open={open[1]}
				title="Title"
			>
				<BodyText>Hello</BodyText>
				<Button onClick={handleOpen(1, false)}>Close</Button>
			</PopupMenu>

			<PopupMenu
				disabled
				onClose={handleOpen(2, false)}
				open={open[2]}
				title="Title"
			>
				<BodyText>Hello</BodyText>
				<Button onClick={handleOpen(2, false)}>Close</Button>
			</PopupMenu>

			<PopupMenu
				aria-label="This is a Label."
				onClose={handleOpen(3, false)}
				open={open[3]}
			>
				<BodyText>Hello</BodyText>
				<Button onClick={handleOpen(3, false)}>Close</Button>
			</PopupMenu>

			<PopupMenu
				aria-label="This is a Label."
				onClose={handleOpen(4, false)}
				open={open[4]}
				title="Title"
			>
				<BodyText>Hello</BodyText>
				<Button onClick={handleOpen(4, false)}>Close</Button>
			</PopupMenu>

			<PopupMenu
				aria-label="This is a Label."
				disabled
				onClose={handleOpen(4, false)}
				open={open[5]}
				title="Title"
			>
				<BodyText>Hello</BodyText>
				<Button onClick={handleOpen(5, false)}>Close</Button>
			</PopupMenu>
		</>
	);
};

export default PopupMenuView;
