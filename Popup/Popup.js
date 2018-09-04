import compose from 'ramda/src/compose';
import FloatingLayer from '@enact/ui/FloatingLayer';
import {forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';

import Skinnable, {SkinContext} from '../Skinnable';
import Divider from '../Divider';
import Button from '../Button';

import componentCss from './Popup.less';

const forwardHide = forward('onHide');
// const SkinContext = React.createContext(null);

const PopupBase = kind({
	name: 'Popup',
	propTypes: {
		closeButton: PropTypes.bool,
		css: PropTypes.object,
		noAnimation: PropTypes.bool,
		onCloseButtonClick: PropTypes.func,
		onHide: PropTypes.func,
		open: PropTypes.bool,
		title: PropTypes.string
	},
	defaultProps: {
		noAnimation: false,
		closeButton: false,
		open: false
	},
	styles: {
		css: componentCss,
		className: 'popup'
	},
	computed: {
		className: ({closeButton, styler}) => styler.append({withCloseButton: closeButton})
	},
	render: ({buttons, children, closeButton, css, noAnimation, onCloseButtonClick, onHide, open, title, ...rest}) => {
		// delete rest.onCloseButtonClick;
		return (
			<SkinContext.Consumer>
				{(skin) => {
					// const effectiveSkin = determineSkin(skin, parentSkin);
					// console.log('popup context:', skin);

					const wideLayout = (skin === 'carbon');

					// <SkinContext.Provider value={skin}>
					return (
						<Transition
							noAnimation={noAnimation}
							visible={open}
							direction="down"
							duration="short"
							type="fade"
							className={css.popupTransitionContainer}
							onHide={onHide}
						>
							<div
								{...rest}
							>
								{closeButton ? <Button
									icon="closex"
									small
									onTap={onCloseButtonClick}
									className={componentCss.closeButton}
								/> : null}
								{title ? <Divider className={css.title}>{title}</Divider> : null}
								<Layout orientation={wideLayout ? 'horizontal' : 'vertical'} className={css.body}>
									<Cell shrink={!wideLayout} className={css.content + (title ? '' + css.withTitle : '')}>
										{children}
									</Cell>
									{buttons ? <Cell shrink className={css.buttons}>
										{buttons}
									</Cell> : null}
								</Layout>
							</div>
						</Transition>
					);
					// </SkinContext.Provider>
				}}
			</SkinContext.Consumer>
		);
	}
});

/**
 * Applies Agate specific behaviors to [DividerBase]{@link agate/Divider.DividerBase}.
 *
 * @hoc
 * @memberof agate/Divider
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const PopupDecorator = compose(
	Slottable({slots: ['closeButton', 'title', 'buttons']}),
	Skinnable
);

class PopupState extends React.Component {
	static propTypes = {
		noAnimation: PropTypes.bool,
		noAutoDismiss: PropTypes.bool,
		onClose: PropTypes.func,
		open: PropTypes.bool,
		scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none'])
	}

	static defaultProps = {
		noAnimation: false,
		noAutoDismiss: false,
		open: false,
		scrimType: 'translucent'
	}

	constructor (props) {
		super(props);
		this.state = {
			floatLayerOpen: this.props.open,
			popupOpen: this.props.noAnimation
		};
	}

	componentWillReceiveProps (nextProps) {
		if (!this.props.open && nextProps.open) {
			this.setState({
				popupOpen: nextProps.noAnimation,
				floatLayerOpen: true
			});
		} else if (this.props.open && !nextProps.open) {
			this.setState({
				popupOpen: nextProps.noAnimation,
				floatLayerOpen: !nextProps.noAnimation
			});
		}
	}

	handleFloatingLayerOpen = () => {
		if (!this.props.noAnimation) {
			this.setState({
				popupOpen: true
			});
		}
	}


	handlePopupHide = () => {
		forwardHide(null, this.props);

		this.setState({
			floatLayerOpen: false,
			activator: null
		});
	}

	render () {
		const {noAutoDismiss, onClose, scrimType, ...rest} = this.props;
		delete rest.spotlightRestrict;

		return (
			<FloatingLayer
				noAutoDismiss={noAutoDismiss}
				open={this.state.floatLayerOpen}
				onOpen={this.handleFloatingLayerOpen}
				onDismiss={onClose}
				scrimType={scrimType}
			>
				<PopupBase
					{...rest}
					onCloseButtonClick={onClose}
					open={this.state.popupOpen}
					onHide={this.handlePopupHide}
				/>
			</FloatingLayer>
		);
	}
}

const Popup = PopupDecorator(PopupState);

export default Popup;
export {Popup, PopupBase};
