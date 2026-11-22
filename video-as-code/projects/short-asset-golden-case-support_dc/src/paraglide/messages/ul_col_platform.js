/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Col_PlatformInputs */

const en_ul_col_platform = /** @type {(inputs: Ul_Col_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platform`)
};

const zh_ul_col_platform = /** @type {(inputs: Ul_Col_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台`)
};

/**
* | output |
* | --- |
* | "Platform" |
*
* @param {Ul_Col_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_platform = /** @type {((inputs?: Ul_Col_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_col_platform(inputs)
	return zh_ul_col_platform(inputs)
});