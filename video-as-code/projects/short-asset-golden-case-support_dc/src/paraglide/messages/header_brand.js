/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_BrandInputs */

const en_header_brand = /** @type {(inputs: Header_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Brand`)
};

const zh_header_brand = /** @type {(inputs: Header_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`品牌`)
};

/**
* | output |
* | --- |
* | "Brand" |
*
* @param {Header_BrandInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_brand = /** @type {((inputs?: Header_BrandInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_BrandInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_brand(inputs)
	return zh_header_brand(inputs)
});