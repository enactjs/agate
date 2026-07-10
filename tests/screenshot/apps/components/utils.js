import {isValidElement} from 'react';

const withConfig = (config, tests) => {
	return tests.map(t => {
		if (isValidElement(t)) {
			return {
				...config,
				component: t
			};
		}

		return {
			...t,
			...config
		};
	});
};

const TALLGLYPH_LOCALES = ['vi-VN'];

const TallglyphMultiScript = 'ฟิ้  ไั  ஒ  து';

/** QWTC sample: multi-script string with truncated Tamil ending (Heading, Header). */
const TallglyphMultiScriptQwtc = 'ฟิ้  ไั  ஒ  த';

/** Devanagari sample for tallglyph QWTC scenarios. */
const TallglyphHindi = 'नरेंद्र मोदी';

/** Khmer sample for tallglyph QWTC scenarios and km-KH locale tests. */
const TallglyphKhmer = 'តន្ត្រី';

/** Latin extended sample for vi tallglyph typography. */
const TallglyphLatin = 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ';

export {

	TALLGLYPH_LOCALES,
	TallglyphHindi,
	TallglyphKhmer,
	TallglyphLatin,
	TallglyphMultiScript,
	TallglyphMultiScriptQwtc,
	withConfig
};
