/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Sort_OrderInputs */

const en_ul_sort_order = /** @type {(inputs: Ul_Sort_OrderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Order`)
};

const zh_ul_sort_order = /** @type {(inputs: Ul_Sort_OrderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`顺序`)
};

/**
* | output |
* | --- |
* | "Order" |
*
* @param {Ul_Sort_OrderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_order = /** @type {((inputs?: Ul_Sort_OrderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_OrderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_sort_order(inputs)
	return zh_ul_sort_order(inputs)
});