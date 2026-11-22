/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Load_Messages_ErrorInputs */

const en_ul_load_messages_error = /** @type {(inputs: Ul_Load_Messages_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load messages`)
};

const zh_ul_load_messages_error = /** @type {(inputs: Ul_Load_Messages_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载消息失败`)
};

/**
* | output |
* | --- |
* | "Failed to load messages" |
*
* @param {Ul_Load_Messages_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_load_messages_error = /** @type {((inputs?: Ul_Load_Messages_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Load_Messages_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_load_messages_error(inputs)
	return zh_ul_load_messages_error(inputs)
});