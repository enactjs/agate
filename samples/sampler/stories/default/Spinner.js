import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import kind from '@enact/core/kind';
import UiSpinner, {SpinnerBase as UiSpinnerBase} from '@enact/ui/Spinner';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import Skinnable from '@enact/agate/Skinnable';
import Spinner, {SpinnerBase} from '@enact/agate/Spinner';

Spinner.displayName = 'Spinner';
const Config = mergeComponentMetadata('Spinner', UiSpinnerBase, UiSpinner, SpinnerBase, Spinner);

const SkinnedSpinnerBase = kind({
	name: 'SkinSpinner',

	propTypes: {
		skinVariants: PropTypes.object
	},

	render: ({skinVariants, ...rest}) => {
		return <Spinner {...rest} color={skinVariants.night ? 'light' : 'dark'} />;
	}
});

const SkinnedSpinner = Skinnable({variantsProp: 'skinVariants'}, SkinnedSpinnerBase);

export default {
	title: 'Agate/Spinner',
	component: 'Spinner'
};

export const _Spinner = (args) => (
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				position: 'absolute',
				height: '100%',
				width: '100%',
				top: 0,
				left: 0
			}}
		/>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<label
				style={{
					outline: 'teal dashed 1px',
					backgroundColor: 'rgba(0, 128, 128, 0.5)',
					color: '#0bb',
					position: 'absolute',
					transform: 'translateY(-100%)',
					borderBottomWidth: 0,
					padding: '0.1em 1em',
					fontWeight: 100,
					fontStyle: 'italic',
					fontSize: ri.unit(15, 'rem')
				}}
			>Container</label>
			<div
				style={{
					position: 'absolute',
					height: '100%',
					width: '100%'
				}}
			/>
			<SkinnedSpinner
				blockClickOn={args['blockClickOn']}
				centered={args['centered']}
				paused={args['paused']}
				scrim={args['scrim']}
				size={args['size']}
				type={args['type']}
				transparent={args['transparent']}
			>
				{args['content']}
			</SkinnedSpinner>
		</div>
	</div>
);
select('blockClickOn', _Spinner, [null, 'container', 'screen'], Config);
boolean('centered', _Spinner, Config);
boolean('paused', _Spinner, Config);
boolean('scrim', _Spinner, Config);
select('size', _Spinner, ['huge', 'large', 'small', 'smallest'], Config);
select('type', _Spinner, ['loading', 'searching'], Config, 'searching');
boolean('transparent', _Spinner, Config);
text('content', _Spinner, Config, '');
_Spinner.storyName = 'Spinner';
_Spinner.parameters = {
	info: {
		text: 'Basic usage of Spinner'
	}
};
