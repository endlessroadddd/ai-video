/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Trend_Messages_DescInputs */

const en_ul_trend_messages_desc = /** @type {(inputs: Ul_Trend_Messages_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated from m30_message_counts`)
};

const zh_ul_trend_messages_desc = /** @type {(inputs: Ul_Trend_Messages_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基于 m30_message_counts 数组生成`)
};

/**
* | output |
* | --- |
* | "Generated from m30_message_counts" |
*
* @param {Ul_Trend_Messages_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_trend_messages_desc = /** @type {((inputs?: Ul_Trend_Messages_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Trend_Messages_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_trend_messages_desc(inputs)
	return zh_ul_trend_messages_desc(inputs)
});