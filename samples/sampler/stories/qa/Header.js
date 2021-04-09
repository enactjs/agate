import Header from '@enact/agate/Header';
import Scroller from '@enact/agate/Scroller';
import ri from '@enact/ui/resolution';

Header.displayName = 'Header';

export default {
	title: 'Agate/Header',
	component: 'Header'
};

export const WithNonLatinCharacters = () => (
	<Scroller style={{height: ri.scaleToRem(510)}}>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="نص العنوان"
			title="نص العنوان"
			titleAbove="Arabic text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="سرخی کا متن"
			title="سرخی کا متن"
			titleAbove="Urdu text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="የራስጌ ጽሑፍ"
			title="የራስጌ ጽሑፍ"
			titleAbove="Amharic text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="ข้อความหัวเรื่อง"
			title="ข้อความหัวเรื่อง"
			titleAbove="Thai text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="제목 텍스트"
			title="제목 텍스트"
			titleAbove="Korean text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="标题文字"
			title="标题文字"
			titleAbove="Simplified Chinese text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="標題文字"
			title="標題文字"
			titleAbove="Traditional Chinese text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="見出しテキスト"
			title="見出しテキスト"
			titleAbove="Japanese text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="தலைப்பு உரை"
			title="தலைப்பு உரை"
			titleAbove="Tamil text"
		/>
		<Header
			style={{marginTop: ri.scaleToRem(24)}}
			subtitle="ශීර්ෂ පා ය"
			title="ශීර්ෂ පා ය"
			titleAbove="Sinhala text"
		/>
	</Scroller>
);

WithNonLatinCharacters.storyName = 'With non-latin characters';

