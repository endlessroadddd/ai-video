/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Min_MessagesInputs */

const en_ul_min_messages = /** @type {(inputs: Ul_Min_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Min messages`)
};

const zh_ul_min_messages = /** @type {(inputs: Ul_Min_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最少消息数`)
};

/**
* | output |
* | --- |
* | "Min messages" |
*
* @param {Ul_Min_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_min_messages = /** @type {((inputs?: Ul_Min_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Min_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_min_messages(inputs)
	return zh_ul_min_messages(inputs)
});