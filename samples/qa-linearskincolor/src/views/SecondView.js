import Button from '@enact/agate/Button';
import Heading from '@enact/agate/Heading';
import {Link} from 'react-router-dom';

import css from './SecondView.module.less';

const SecondView = () => {
	return (
		<div className={css.header}>
			<Link to="/">
				<Button icon="arrowlargeleft" size="small" />
			</Link>
			<Heading>Second View</Heading>
			<Link to="/thirdView">
				<Button icon="arrowlargeright" size="small"/>
			</Link>
		</div>
	)
};

export default SecondView;
