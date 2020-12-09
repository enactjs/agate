import Button from '../../../../Button';
import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';
import TabGroup from '../../../../TabGroup';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import {scaleToRem} from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: scaleToRem(900)}}>
			<Heading>TabGroup default</Heading>
			<TabGroup
				className="tabGroupDefault"
				tabPosition='before'
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
			<Heading>TabGroup with slotBefore/slotAfter</Heading>
			<TabGroup
				className="tabGroupSlotBeforeAfter"
				tabPosition='before'
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			>
				<beforeTabs>
					<Button
						className="previousButton"
						icon='arrowlargeleft'
						size="small"
						type="grid"
					/>
				</beforeTabs>
				<afterTabs>
					<Button
						className="nextButton"
						icon='arrowlargeright'
						size="small"
						type="grid"
					/>
				</afterTabs>
			</TabGroup>
			<Heading>TabGroup tabPosition before</Heading>
			<TabGroup
				className="tabGroupTabPositionAfter"
				tabPosition='after'
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
			<Heading>TabGroup Vertical</Heading>
			<div style={{width: scaleToRem(700), height: scaleToRem(400)}}>
				<TabGroup
					className="tabGroupVertical"
					orientation="vertical"
					tabPosition='before'
					tabs={[
						{title: 'Home', icon: 'home'},
						{title: 'Settings', icon: 'setting'},
						{title: 'Theme', icon: 'display'}
					]}
				/>
			</div>
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
