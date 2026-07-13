import ri from '@enact/ui/resolution';
import ImageItem from '../../../../ImageItem';

import img from '../../images/600x600.png';

const Wrapper = ({children}) => (
	<div style={{height: '100%'}}>
		<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
			{children}
		</div>
	</div>
);

const ImageItemSmokeTests = [
	<Wrapper><ImageItem src={img}>caption</ImageItem></Wrapper>,
	<Wrapper><ImageItem src={img} orientation="horizontal">caption</ImageItem></Wrapper>,
	<Wrapper><ImageItem src={img} captionPosition="overlay">caption</ImageItem></Wrapper>,
	<Wrapper><ImageItem src={img} orientation="horizontal" sizing="fill">caption</ImageItem></Wrapper>,
	<Wrapper><ImageItem src={img} orientation="horizontal" sizing="none">caption</ImageItem></Wrapper>,
	<Wrapper><ImageItem src={img} orientation="horizontal" sizing="fit">caption</ImageItem></Wrapper>
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
