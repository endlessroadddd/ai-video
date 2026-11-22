/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Platform_AllInputs */

const en_ul_platform_all = /** @type {(inputs: Ul_Platform_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Platforms`)
};

const zh_ul_platform_all = /** @type {(inputs: Ul_Platform_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部平台`)
};

/**
* | output |
* | --- |
* | "All Platforms" |
*
* @param {Ul_Platform_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_platform_all = /** @type {((inputs?: Ul_Platform_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Platform_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_platform_all(inputs)
	return zh_ul_platform_all(inputs)
});