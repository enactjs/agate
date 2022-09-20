import CheckboxItem from '@enact/agate/CheckboxItem';

const ScrollModeSwitch = (props) => {
	return (
		<CheckboxItem {...props} size="small">
			Native Scrolling
		</CheckboxItem>
	);
};

export default ScrollModeSwitch;
export {ScrollModeSwitch};
