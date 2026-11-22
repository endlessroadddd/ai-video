/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Loading_MessagesInputs */

const en_ul_loading_messages = /** @type {(inputs: Ul_Loading_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading messages`)
};

const zh_ul_loading_messages = /** @type {(inputs: Ul_Loading_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载消息中`)
};

/**
* | output |
* | --- |
* | "Loading messages" |
*
* @param {Ul_Loading_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_loading_messages = /** @type {((inputs?: Ul_Loading_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Loading_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_loading_messages(inputs)
	return zh_ul_loading_messages(inputs)
});