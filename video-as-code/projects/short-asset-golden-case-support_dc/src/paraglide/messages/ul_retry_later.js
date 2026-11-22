/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Retry_LaterInputs */

const en_ul_retry_later = /** @type {(inputs: Ul_Retry_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please try again later`)
};

const zh_ul_retry_later = /** @type {(inputs: Ul_Retry_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请稍后重试`)
};

/**
* | output |
* | --- |
* | "Please try again later" |
*
* @param {Ul_Retry_LaterInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_retry_later = /** @type {((inputs?: Ul_Retry_LaterInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Retry_LaterInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_retry_later(inputs)
	return zh_ul_retry_later(inputs)
});