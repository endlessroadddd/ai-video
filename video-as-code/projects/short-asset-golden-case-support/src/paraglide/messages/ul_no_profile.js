/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_No_ProfileInputs */

const en_ul_no_profile = /** @type {(inputs: Ul_No_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No profile yet`)
};

const zh_ul_no_profile = /** @type {(inputs: Ul_No_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`尚未补充用户画像`)
};

/**
* | output |
* | --- |
* | "No profile yet" |
*
* @param {Ul_No_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_profile = /** @type {((inputs?: Ul_No_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_no_profile(inputs)
	return zh_ul_no_profile(inputs)
});