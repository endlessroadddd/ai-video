/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Filter_CommunityInputs */

const en_cp_filter_community = /** @type {(inputs: Cp_Filter_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Community`)
};

const zh_cp_filter_community = /** @type {(inputs: Cp_Filter_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区`)
};

/**
* | output |
* | --- |
* | "Community" |
*
* @param {Cp_Filter_CommunityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_filter_community = /** @type {((inputs?: Cp_Filter_CommunityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Filter_CommunityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_filter_community(inputs)
	return zh_cp_filter_community(inputs)
});