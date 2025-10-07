import Button from '../../../../Button';
import Heading from '../../../../Heading';
import TabGroup from '../../../../TabGroup';
import ThemeDecorator from '../../../../ThemeDecorator';
import {scaleToRem} from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off, so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={{display: 'flex', flexWrap: 'wrap'}}>
		<div style={{width: '50%'}}>
			<Heading>TabGroup default</Heading>
			<TabGroup
				className="tabGroupDefault"
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		</div>
		<div style={{width: '50%'}}>
			<Heading>TabGroup with slotBefore/slotAfter</Heading>
			<TabGroup
				className="tabGroupSlotBeforeAfter"
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			>
				<beforeTabs>
					<Button
						className="previousButton"
						icon="arrowlargeleft"
						size="small"
						type="grid"
					/>
				</beforeTabs>
				<afterTabs>
					<Button
						className="nextButton"
						icon="arrowlargeright"
						size="small"
						type="grid"
					/>
				</afterTabs>
			</TabGroup>
		</div>
		<div style={{width: '50%'}}>
			<Heading>TabGroup tabPosition after</Heading>
			<TabGroup
				className="tabGroupTabPositionAfter"
				tabPosition="after"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		</div>
		<div style={{width: '50%'}}>
			<Heading>TabGroup tabPosition after</Heading>
			<TabGroup
				className="tabGroupTabPositionAfter"
				tabPosition="after"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		</div>
		<div style={{width: '100%'}}>
			<Heading>TabGroup Vertical</Heading>
			<div style={{width: scaleToRem(700), height: scaleToRem(400)}}>
				<TabGroup
					className="tabGroupVertical"
					orientation="vertical"
					tabPosition="before"
					tabs={[
						{title: 'Home', icon: 'home'},
						{title: 'Settings', icon: 'setting'},
						{title: 'Theme', icon: 'display'}
					]}
				/>
			</div>
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
