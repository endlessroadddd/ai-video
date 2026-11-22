/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_Profile_CollapseInputs */

const en_ul_detail_profile_collapse = /** @type {(inputs: Ul_Detail_Profile_CollapseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Collapse`)
};

const zh_ul_detail_profile_collapse = /** @type {(inputs: Ul_Detail_Profile_CollapseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`收起`)
};

/**
* | output |
* | --- |
* | "Collapse" |
*
* @param {Ul_Detail_Profile_CollapseInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_profile_collapse = /** @type {((inputs?: Ul_Detail_Profile_CollapseInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Profile_CollapseInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_profile_collapse(inputs)
	return zh_ul_detail_profile_collapse(inputs)
});