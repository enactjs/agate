import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import LS2Request from '@enact/webos/LS2Request';
import {readAlert} from '@enact/webos/speech';
import {useCallback, useEffect, useState} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ReadAlertView = () => {
	const [audioGuidance, setAudioGuidance] = useState(false);
	const [toggleDisabled, setToggleDisabled] = useState(true);

	useEffect(() => {
		if (window.PalmServiceBridge) {
			new LS2Request().send({
				service: 'luna://com.webos.settingsservice/',
				method: 'getSystemSettings',
				parameters: {
					category: 'option',
					keys: ['audioGuidance']
				},
				onSuccess: (res) => {
					setAudioGuidance(res.settings.audioGuidance === 'on');
					setToggleDisabled(false);
				}
			});
		}
	});

	const onClick = (clear) => () => readAlert('Enact is a framework designed to be performant, customizable and well structured.', clear);

	const onClick1 = onClick(true);
	const onClick2 = onClick(false);

	const onToggle = useCallback(() => {
		if (window.PalmServiceBridge) {
			setAudioGuidance(guidance => setAudioGuidance(!guidance));
			new LS2Request().send({
				service: 'luna://com.webos.settingsservice/',
				method: 'setSystemSettings',
				parameters: {
					category: 'option',
					settings: {
						audioGuidance: audioGuidance ? 'on' : 'off'
					}
				}
			});
		}
	}, [audioGuidance]);

	return (
		<>
			<Section title="AudioGuidance On or Off">
				<CheckboxItem
					alt="Toggle"
					defaultSelected={audioGuidance}
					disabled={toggleDisabled}
					onToggle={onToggle}
				>
					Audio guidance
				</CheckboxItem>
			</Section>
			<Section className={appCss.marginTop} title="readAlert">
				<Button alt="Clear of true" onClick={onClick1}>readAlert test(clear true)</Button>
				<Button alt="Clear of false" onClick={onClick2}>readAlert test(clear false)</Button>
			</Section>
		</>
	);
};

export default ReadAlertView;
