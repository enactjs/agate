/* eslint-disable react/jsx-no-bind */

import Button from '@enact/agate/Button';
import ProgressBar from '@enact/agate/ProgressBar';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ProgressBarView = () => {
	const [value, setValue] = React.useState(0);
	const ariaLabel = (value === 0.5) ? '50% progressing' : 'Completed';

	const handleDecreaseBarValue = () => setValue(Math.max((value - 0.1).toFixed(1), 0));
	const handleIncreaseBarValue = () => setValue(Math.min((value + 0.1).toFixed(1), 1));

	return (
		<Section title="Default">
			<div>
				<div className={appCss.controls}>
					<Button aria-label="This is Decrease." icon="minus" onClick={handleDecreaseBarValue} />
					<Button aria-label="This is Increase." icon="plus" onClick={handleIncreaseBarValue} />
				</div>
				<ProgressBar
					aria-label={ariaLabel}
					aria-live="assertive"
					progress={value}
				/>
			</div>
		</Section>
	);
};

export default ProgressBarView;
