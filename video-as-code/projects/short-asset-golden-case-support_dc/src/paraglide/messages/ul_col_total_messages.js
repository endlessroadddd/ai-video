/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Col_Total_MessagesInputs */

const en_ul_col_total_messages = /** @type {(inputs: Ul_Col_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Messages`)
};

const zh_ul_col_total_messages = /** @type {(inputs: Ul_Col_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总消息数`)
};

/**
* | output |
* | --- |
* | "Messages" |
*
* @param {Ul_Col_Total_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_total_messages = /** @type {((inputs?: Ul_Col_Total_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_Total_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_col_total_messages(inputs)
	return zh_ul_col_total_messages(inputs)
});