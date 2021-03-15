import ThumbnailItem from '@enact/agate/ThumbnailItem';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ThumbnailItemView = () => (
	<>
		<Section title="Default">
			<ThumbnailItem alt="Normal" src="https://dummyimage.com/64/e048e0/0011ff">Text 0</ThumbnailItem>
			<ThumbnailItem alt="Disabled" disabled src="https://dummyimage.com/64/e048e0/0011ff">Text 1</ThumbnailItem>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ThumbnailItem alt="Aria-labelled" aria-label="This is a Label." src="https://dummyimage.com/64/e048e0/0011ff">Text 2</ThumbnailItem>
			<ThumbnailItem alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled src="https://dummyimage.com/64/e048e0/0011ff">Text 3</ThumbnailItem>
		</Section>
	</>
);

export default ThumbnailItemView;
