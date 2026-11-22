/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Order_AscInputs */

const en_ul_order_asc = /** @type {(inputs: Ul_Order_AscInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ascending`)
};

const zh_ul_order_asc = /** @type {(inputs: Ul_Order_AscInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`升序`)
};

/**
* | output |
* | --- |
* | "Ascending" |
*
* @param {Ul_Order_AscInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_order_asc = /** @type {((inputs?: Ul_Order_AscInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Order_AscInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_order_asc(inputs)
	return zh_ul_order_asc(inputs)
});