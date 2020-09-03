import ImageItem from '@enact/agate/ImageItem';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ImageItemView = () => (
	<>
		<Section title="Default">
			<ImageItem
				alt="With Children"
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text 0
			</ImageItem>

			<ImageItem
				alt="Disabled with Children"
				disabled
				orientation="horizontal"
				selected
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text 1
			</ImageItem>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ImageItem
				alt="Aria-labelled with Children"
				aria-label="This is a Label 0."
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text 0
			</ImageItem>

			<ImageItem
				alt="Aria-labelled and Disabled with Children"
				aria-label="This is a Label 1."
				disabled
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text 1
			</ImageItem>
		</Section>
	</>
);

export default ImageItemView;
