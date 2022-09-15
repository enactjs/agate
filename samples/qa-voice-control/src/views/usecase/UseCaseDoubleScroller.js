import Heading from '@enact/agate/Heading';
import Item from '@enact/agate/Item';
import Scroller from '@enact/agate/Scroller';
import Repeater from '@enact/ui/Repeater';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

let itemList = [
	'고양이', '강아지', '멍멍이', '토끼', '개미', '사자', '호랑이', '물고기', '기린', '원숭이', '쥐', '뱀', '박쥐', '치타', '낙타', '연어', '광어', '참치', '돔', '방어'
];

const UseCaseDoubleScroller = () => {
	const [isAfricaFocused, setIsAfricaFocused] = useState(false);
	const [isKoreaFocused, setIsKoreaFocused] = useState(true);
	const [result, setResult] = useState('');

	const updateResult = (msg) => setResult(msg);

	const handleKoreaFocus = useCallback((e) => {
		if (!isKoreaFocused) {
			setIsAfricaFocused(false);
			setIsKoreaFocused(true);
		}
		updateResult('handleKoreaFocus > ' + e.target.innerText);
	}, [isKoreaFocused]);

	const handleAfricaFocus = useCallback((e) => {
		if (!isAfricaFocused) {
			setIsAfricaFocused(true);
			setIsKoreaFocused(false);
		}
		updateResult('handleAfricaFocus > ' + e.target.innerText);
	}, [isAfricaFocused]);

	return (
		<CommonView noScroller title="Double Scroller" subtitle={result}>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<div>
					<Heading style={{width: ri.scale(400)}}>{'한국'}</Heading>
					<div data-korea-scroller>
						<Scroller
							data-webos-voice-focused={isKoreaFocused}
							onFocus={handleKoreaFocus}
							style={{width: ri.scale(400), height: ri.scale(700)}}
						>
							<Repeater
								childComponent={Item}
								itemProps={{
									'data-webos-voice-group-label': '한국'
								}}
							>
								{itemList}
							</Repeater>
						</Scroller>
					</div>
				</div>
				<div>
					<Heading style={{width: ri.scale(400)}}>{'아프리카'}</Heading>
					<div data-africa-scroller>
						<Scroller
							data-webos-voice-focused={isAfricaFocused}
							onFocus={handleAfricaFocus}
							style={{width: ri.scale(400), height: ri.scale(700)}}
						>
							<Repeater
								childComponent={Item}
								itemProps={{
									'data-webos-voice-group-label': '아프리카'
								}}
							>
								{itemList}
							</Repeater>
						</Scroller>
					</div>
				</div>
			</div>
		</CommonView>
	);

};

export default UseCaseDoubleScroller;
