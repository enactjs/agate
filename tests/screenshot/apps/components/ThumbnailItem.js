import ThumbnailItem from '../../../../ThumbnailItem';

import img from '../../images/600x600.png';

const ThumbnailItemTests = [
	<ThumbnailItem src={img}>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} selected>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content">Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content" disabled>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content" inline>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content" type="styled">Main Content</ThumbnailItem>,
	{
		component: <ThumbnailItem src={img}>Focused Thumbnail Item</ThumbnailItem>,
		focus: true
	},
	{
		component: <ThumbnailItem src={img} selected>Focused Thumbnail Item</ThumbnailItem>,
		focus: true
	}
];

export default ThumbnailItemTests;
