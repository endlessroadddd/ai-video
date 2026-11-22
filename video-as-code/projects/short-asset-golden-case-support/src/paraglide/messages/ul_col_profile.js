/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Col_ProfileInputs */

const en_ul_col_profile = /** @type {(inputs: Ul_Col_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile`)
};

const zh_ul_col_profile = /** @type {(inputs: Ul_Col_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户画像`)
};

/**
* | output |
* | --- |
* | "Profile" |
*
* @param {Ul_Col_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_profile = /** @type {((inputs?: Ul_Col_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_col_profile(inputs)
	return zh_ul_col_profile(inputs)
});