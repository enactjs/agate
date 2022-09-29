import Image from '../../../../Image';

import hd from '../../images/200x200.png';

const ImageTests = [
	<Image />,
	<Image src={hd} />,
	<Image sizing="fit" src={hd} />
];

export default ImageTests;
