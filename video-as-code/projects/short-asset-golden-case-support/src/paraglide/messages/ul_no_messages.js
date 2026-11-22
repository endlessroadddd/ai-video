/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_No_MessagesInputs */

const en_ul_no_messages = /** @type {(inputs: Ul_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No chat records`)
};

const zh_ul_no_messages = /** @type {(inputs: Ul_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无聊天记录`)
};

/**
* | output |
* | --- |
* | "No chat records" |
*
* @param {Ul_No_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_messages = /** @type {((inputs?: Ul_No_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_no_messages(inputs)
	return zh_ul_no_messages(inputs)
});