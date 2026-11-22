/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_Profile_ExpandInputs */

const en_ul_detail_profile_expand = /** @type {(inputs: Ul_Detail_Profile_ExpandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expand`)
};

const zh_ul_detail_profile_expand = /** @type {(inputs: Ul_Detail_Profile_ExpandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`展开`)
};

/**
* | output |
* | --- |
* | "Expand" |
*
* @param {Ul_Detail_Profile_ExpandInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_profile_expand = /** @type {((inputs?: Ul_Detail_Profile_ExpandInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Profile_ExpandInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_profile_expand(inputs)
	return zh_ul_detail_profile_expand(inputs)
});