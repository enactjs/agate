import Heading from '../../../../Heading';
import ImageItem from '../../../../ImageItem';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: ri.scaleToRem(900)}}>
			<Heading>Image Item Default</Heading>
			<ImageItem
				id="imageItem1"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item caption
			</ImageItem>
			<Heading>Image Item with long caption</Heading>
			<ImageItem
				id="imageItem2"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item with longer caption has Marquee applied
			</ImageItem>
			<Heading>Image Item caption overlay</Heading>
			<ImageItem
				id="imageItem3"
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				captionPosition="overlay"
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item caption overlay
			</ImageItem>
			<Heading>Image Item disabled</Heading>
			<ImageItem
				id="imageItem4"
				disabled
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}
			>
				Image Item disabled
			</ImageItem>
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
