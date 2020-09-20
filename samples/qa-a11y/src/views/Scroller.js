/* eslint-disable react/jsx-no-bind */

import CheckboxItem from '@enact/agate/CheckboxItem';
import Header from '@enact/agate/Header';
import Scroller from '@enact/agate/Scroller';
import ri from '@enact/ui/resolution';
import React from 'react';

const ScrollerView = () => {
	const [native, setNative] = React.useState(true);
	const [customAriaLabel, setCustomAriaLabel] = React.useState(false);
	const scrollMode = native ? 'native' : 'translate';

	const handleChangeJSNativeButton = () => setNative(!native);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);

	return (
		<>
			<Header title="Scroller">
				<CheckboxItem
					onToggle={handleChangeAriaLabelButton}
					selected={customAriaLabel}
					style={{width: '350px'}} // FIXME: If no width, then the text doesn't display.
				>
					Customizable aria-labels on ScrollThumbs
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleChangeJSNativeButton}
					selected={native}
					style={{width: '250px'}} // FIXME: If no width, then the text doesn't display.
				>
					Native
				</CheckboxItem>
			</Header>
			<Scroller
				focusableScrollbar
				scrollDownAriaLabel={customAriaLabel ? 'This is vertical scroll down aria label' : null}
				scrollLeftAriaLabel={customAriaLabel ? 'This is horizontal scroll left aria label' : null}
				scrollMode={scrollMode}
				scrollRightAriaLabel={customAriaLabel ? 'This is vertical scroll right aria label' : null}
				scrollUpAriaLabel={customAriaLabel ? 'This is horizontal scroll up aria label' : null}
				style={{height: 'calc(100% - 130px'}}
			>
				<div style={{width: ri.scaleToRem(6000)}}>
					Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
				</div>
			</Scroller>
		</>
	);
};

export default ScrollerView;
