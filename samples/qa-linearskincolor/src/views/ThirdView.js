import Button from '@enact/agate/Button';
import Heading from '@enact/agate/Heading';
import {Link} from 'react-router-dom';

import css from './ThirdView.module.less';

const ThirdView = () => {
	return (
		<div className={css.header}>
			<Link to="/secondView">
				<Button className={css.backButton} icon="arrowlargeleft" size="small" />
			</Link>
			<Heading className={css.heading}>Third View</Heading>
		</div>
	);
};

export default ThirdView;
