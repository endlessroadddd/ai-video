/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Feishu_Discovered_CandidatesInputs */

const en_feishu_discovered_candidates = /** @type {(inputs: Feishu_Discovered_CandidatesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Feishu workgroup candidate(s) found`)
};

const zh_feishu_discovered_candidates = /** @type {(inputs: Feishu_Discovered_CandidatesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已发现 ${i?.count} 个飞书工作群候选`)
};

/**
* | output |
* | --- |
* | "{count} Feishu workgroup candidate(s) found" |
*
* @param {Feishu_Discovered_CandidatesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_discovered_candidates = /** @type {((inputs: Feishu_Discovered_CandidatesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Discovered_CandidatesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_discovered_candidates(inputs)
	return zh_feishu_discovered_candidates(inputs)
});