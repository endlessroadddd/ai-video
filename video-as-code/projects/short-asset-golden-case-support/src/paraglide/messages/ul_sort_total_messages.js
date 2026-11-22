/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Sort_Total_MessagesInputs */

const en_ul_sort_total_messages = /** @type {(inputs: Ul_Sort_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total Messages`)
};

const zh_ul_sort_total_messages = /** @type {(inputs: Ul_Sort_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总消息数`)
};

/**
* | output |
* | --- |
* | "Total Messages" |
*
* @param {Ul_Sort_Total_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_total_messages = /** @type {((inputs?: Ul_Sort_Total_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Total_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_sort_total_messages(inputs)
	return zh_ul_sort_total_messages(inputs)
});