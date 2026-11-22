/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Chat_RecordsInputs */

const en_ul_chat_records = /** @type {(inputs: Ul_Chat_RecordsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat Records`)
};

const zh_ul_chat_records = /** @type {(inputs: Ul_Chat_RecordsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`聊天记录`)
};

/**
* | output |
* | --- |
* | "Chat Records" |
*
* @param {Ul_Chat_RecordsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_chat_records = /** @type {((inputs?: Ul_Chat_RecordsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Chat_RecordsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_chat_records(inputs)
	return zh_ul_chat_records(inputs)
});