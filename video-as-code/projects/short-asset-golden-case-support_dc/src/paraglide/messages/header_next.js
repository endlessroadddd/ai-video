/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_NextInputs */

const en_header_next = /** @type {(inputs: Header_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next page`)
};

const zh_header_next = /** @type {(inputs: Header_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一页`)
};

/**
* | output |
* | --- |
* | "Next page" |
*
* @param {Header_NextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_next = /** @type {((inputs?: Header_NextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_NextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_next(inputs)
	return zh_header_next(inputs)
});