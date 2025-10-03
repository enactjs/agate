import Heading from '../../../../Heading';
import ImageItem from '../../../../ImageItem';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off, so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: ri.scaleToRem(900)}}>
			<Heading>Image Item Default</Heading>
			<ImageItem
				id="imageItem1"
				src={svgGenerator(300, 400, '#ffffff', 'Image0', 'Image 0')}
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item caption
			</ImageItem>
			<Heading>Image Item with long caption</Heading>
			<ImageItem
				id="imageItem2"
				src={svgGenerator(300, 400, '#ffffff', 'Image1', 'Image 1')}
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item with longer caption has Marquee applied
			</ImageItem>
			<Heading>Image Item caption overlay</Heading>
			<ImageItem
				id="imageItem3"
				src={svgGenerator(300, 400, '#ffffff', 'Image0', 'Image 0')}
				captionPosition="overlay"
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item caption overlay
			</ImageItem>
			<Heading>Image Item disabled</Heading>
			<ImageItem
				id="imageItem4"
				disabled
				src={svgGenerator(300, 400, '#ffffff', 'Image0', 'Image 0')}
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item disabled
			</ImageItem>
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
