/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_ProfileInputs */

const en_ul_detail_profile = /** @type {(inputs: Ul_Detail_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User Profile`)
};

const zh_ul_detail_profile = /** @type {(inputs: Ul_Detail_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户画像`)
};

/**
* | output |
* | --- |
* | "User Profile" |
*
* @param {Ul_Detail_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_profile = /** @type {((inputs?: Ul_Detail_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_profile(inputs)
	return zh_ul_detail_profile(inputs)
});