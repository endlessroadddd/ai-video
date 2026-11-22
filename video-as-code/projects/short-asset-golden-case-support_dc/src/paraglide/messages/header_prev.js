/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_PrevInputs */

const en_header_prev = /** @type {(inputs: Header_PrevInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous page`)
};

const zh_header_prev = /** @type {(inputs: Header_PrevInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一页`)
};

/**
* | output |
* | --- |
* | "Previous page" |
*
* @param {Header_PrevInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_prev = /** @type {((inputs?: Header_PrevInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_PrevInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_prev(inputs)
	return zh_header_prev(inputs)
});