/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_Messages_CountInputs */

const en_ul_total_messages_count = /** @type {(inputs: Ul_Total_Messages_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} messages total`)
};

const zh_ul_total_messages_count = /** @type {(inputs: Ul_Total_Messages_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`累计 ${i?.count} 条消息`)
};

/**
* | output |
* | --- |
* | "{count} messages total" |
*
* @param {Ul_Total_Messages_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_total_messages_count = /** @type {((inputs: Ul_Total_Messages_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Total_Messages_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_total_messages_count(inputs)
	return zh_ul_total_messages_count(inputs)
});