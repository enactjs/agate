import ri from '@enact/ui/resolution';
import ImageItem from '../../../../ImageItem';

import img from '../../images/600x600.png';

const style = {width: ri.scaleToRem(400), height: ri.scaleToRem(300)};

const ImageItemSmokeTests = [
	<ImageItem src={img}>caption</ImageItem>,
	<ImageItem src={img} orientation="horizontal">caption</ImageItem>,
	<ImageItem src={img} captionPosition="overlay">caption</ImageItem>,
	<ImageItem src={img} orientation="horizontal" sizing="fill">caption</ImageItem>,
	<ImageItem src={img} orientation="horizontal" sizing="none">caption</ImageItem>,
	<ImageItem src={img} orientation="horizontal" sizing="fit">caption</ImageItem>
];

const ImageItemTests = [
	...ImageItemSmokeTests.map(imageTest => {
		return (
			<div style={{height: '100%'}}>
				<div style={style}>
					{imageTest}
				</div>
			</div>
		);
	})
];

export default ImageItemTests;
