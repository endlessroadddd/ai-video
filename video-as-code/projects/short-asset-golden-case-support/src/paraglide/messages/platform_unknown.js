/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Platform_UnknownInputs */

const en_platform_unknown = /** @type {(inputs: Platform_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown`)
};

const zh_platform_unknown = /** @type {(inputs: Platform_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知`)
};

/**
* | output |
* | --- |
* | "Unknown" |
*
* @param {Platform_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_unknown = /** @type {((inputs?: Platform_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_platform_unknown(inputs)
	return zh_platform_unknown(inputs)
});