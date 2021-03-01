import ThumbnailItem from '../../../../ThumbnailItem';

import img from '../../images/600x600.png';

const ThumbnailItemTests = [
	<ThumbnailItem src={img}>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} selected>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content">Main Content</ThumbnailItem>
];

export default ThumbnailItemTests;
