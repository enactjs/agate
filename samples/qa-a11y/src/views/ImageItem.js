import ImageItem from '@enact/agate/ImageItem';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const ImageItemView = () => (
	<>
		<Section title="Default">
			<ImageItem
				alt="With Children"
				orientation="horizontal"
				src={svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200')}
			>
				Text 0
			</ImageItem>

			<ImageItem
				alt="Disabled with Children"
				disabled
				orientation="horizontal"
				selected
				src={svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200')}
			>
				Text 1
			</ImageItem>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ImageItem
				alt="Aria-labelled with Children"
				aria-label="This is a Label 0."
				orientation="horizontal"
				src={svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200')}
			>
				Text 0
			</ImageItem>

			<ImageItem
				alt="Aria-labelled and Disabled with Children"
				aria-label="This is a Label 1."
				disabled
				orientation="horizontal"
				src={svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200')}
			>
				Text 1
			</ImageItem>
		</Section>
	</>
);

export default ImageItemView;
