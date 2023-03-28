import {Link} from 'react-router-dom';

// Components
import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import DateTimePicker from '@enact/agate/DateTimePicker';
import Heading from '@enact/agate/Heading';
import SwitchItem from '@enact/agate/SwitchItem';
import Slider from '@enact/agate/Slider';

import css from './SecondPanel.module.less';

const SecondPanel = () => {
	return (
		<div className={css.container}>
			<div className={css.header}>
				<Link to="/">
					<Button icon="arrowlargeleft" size="small" />
				</Link>
				<Heading className={css.heading}>Second View</Heading>
			</div>
			<BodyText size="small">
				This second panel renders some components for demonstrating that `useLinearSkinColor` hook applies the new generated colors on the entire app.
			</BodyText>
			<div className={css.components}>
				<div style={{marginBottom: '12px'}}>
					<Button size="small">Click</Button>
					<Button disabled selected size="small">Disabled</Button>
					<Button size="small">Selected</Button>
					<Button disabled selected size="small">Disabled</Button>
				</div>
				<SwitchItem className={css.previewSwitchItem} label="label" size="small">SwitchItem</SwitchItem>
				<DateTimePicker />
				<Slider />
			</div>
		</div>
	);
};

export default SecondPanel;
