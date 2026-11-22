/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_No_Available_CandidatesInputs */

const en_feishu_no_available_candidates = /** @type {(inputs: Feishu_No_Available_CandidatesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available Feishu workgroups yet`)
};

const zh_feishu_no_available_candidates = /** @type {(inputs: Feishu_No_Available_CandidatesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有可用的飞书工作群`)
};

/**
* | output |
* | --- |
* | "No available Feishu workgroups yet" |
*
* @param {Feishu_No_Available_CandidatesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_no_available_candidates = /** @type {((inputs?: Feishu_No_Available_CandidatesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_No_Available_CandidatesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_no_available_candidates(inputs)
	return zh_feishu_no_available_candidates(inputs)
});