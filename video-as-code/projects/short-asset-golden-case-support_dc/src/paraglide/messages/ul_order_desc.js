/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Order_DescInputs */

const en_ul_order_desc = /** @type {(inputs: Ul_Order_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Descending`)
};

const zh_ul_order_desc = /** @type {(inputs: Ul_Order_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`降序`)
};

/**
* | output |
* | --- |
* | "Descending" |
*
* @param {Ul_Order_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_order_desc = /** @type {((inputs?: Ul_Order_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Order_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_order_desc(inputs)
	return zh_ul_order_desc(inputs)
});