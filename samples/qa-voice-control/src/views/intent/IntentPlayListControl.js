import {Panel} from '@enact/agate/Panels';
import {VoiceControlDecorator} from '@enact/webos/speech';
import {useState, useCallback} from 'react';

import CommonView from '../../components/CommonView';

const VoicePanel = VoiceControlDecorator(Panel);

const IntentPlayListControl = () => {
	const [result, setResult] = useState('');

	const showResult = (msg) => setResult(msg);

	const handleVoice = useCallback((e) => {
		let direction = e.detail.control;
		showResult('handleVoice > ' + direction);
		e.preventDefault();
	}, []);

	return (
		<VoicePanel data-webos-voice-intent="PlayListControl" noCloseButton onVoice={handleVoice}>
			<CommonView noScroller subtitle={result} title="Intent to play list control">
				<div>{'이전 컨텐츠 재생'}</div>
				<div>{'다음 컨텐츠 재생'}</div>
			</CommonView>
		</VoicePanel>
	);
};

export default IntentPlayListControl;
