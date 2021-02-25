import LabeledIconButton from '../../../../LabeledIconButton';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

const style = {
	main: {
		display: 'grid',
		'gridTemplateColumns': 'repeat(3, 1fr)',
		'gridGap': '6px'
	}
};

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={style.main}>
		<LabeledIconButton
			id="labeledIconButtonDefault"
			icon="temperature"
		>
			LabeledIconButton default
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonCustomIcon"
			icon="happyface"
		>
			LabeledIconButton custom icon
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonSelected"
			icon="temperature"
			selected
		>
			LabeledIconButton selected
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonHighlighted"
			icon="temperature"
			highlighted
		>
			LabeledIconButton highlighted
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonTransparent"
			backgroundOpacity="transparent"
			icon="temperature"
		>
			LabeledIconButton backgroundOpacity transparent
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonSmallest"
			icon="temperature"
			size="smallest"
		>
			LabeledIconButton smallest
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonSmall"
			icon="temperature"
			size="small"
		>
			LabeledIconButton small
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonHuge"
			icon="temperature"
			size="huge"
		>
			LabeledIconButton huge
		</LabeledIconButton>
		<LabeledIconButton
			id="labeledIconButtonDisabled"
			icon="temperature"
			disabled
		>
			LabeledIconButton disabled
		</LabeledIconButton>
	</div>
</div>;

export default ThemeDecorator(app);
