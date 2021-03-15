import ThemeDecorator from '../../../../ThemeDecorator';
import ThumbnailItem from '../../../../ThumbnailItem';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<ThumbnailItem
			id="thumbnailItem1"
			src="https://dummyimage.com/64/e048e0/0011ff"
		>
			Thumbnail Item default
		</ThumbnailItem>
		<ThumbnailItem
			id="thumbnailItem2"
			label="label"
			src="https://dummyimage.com/64/e048e0/0011ff"
		>
			Thumbnail Item with label
		</ThumbnailItem>
		<ThumbnailItem
			id="thumbnailItem3"
			selected
			src="https://dummyimage.com/64/e048e0/0011ff"
		>
			Thumbnail Item selected
		</ThumbnailItem>
		<ThumbnailItem
			id="thumbnailItem4"
			inline
			src="https://dummyimage.com/64/e048e0/0011ff"
		>
			Thumbnail Item inline
		</ThumbnailItem>
		<ThumbnailItem
			id="thumbnailItem5"
			disabled
			inline
			src="https://dummyimage.com/64/e048e0/0011ff"
		>
			Thumbnail Item inline disabled
		</ThumbnailItem>
		<ThumbnailItem
			id="thumbnailItem6"
			disabled
			src="https://dummyimage.com/64/e048e0/0011ff"
		>
			Thumbnail Item disabled
		</ThumbnailItem>
	</div>
</div>;

export default ThemeDecorator(app);
