/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Default_Chat_TypeInputs */

const en_feishu_default_chat_type = /** @type {(inputs: Feishu_Default_Chat_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Group Chat`)
};

const zh_feishu_default_chat_type = /** @type {(inputs: Feishu_Default_Chat_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`群聊`)
};

/**
* | output |
* | --- |
* | "Group Chat" |
*
* @param {Feishu_Default_Chat_TypeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_default_chat_type = /** @type {((inputs?: Feishu_Default_Chat_TypeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Default_Chat_TypeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_default_chat_type(inputs)
	return zh_feishu_default_chat_type(inputs)
});