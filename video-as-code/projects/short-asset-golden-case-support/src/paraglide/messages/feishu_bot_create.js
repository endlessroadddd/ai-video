/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_CreateInputs */

const en_feishu_bot_create = /** @type {(inputs: Feishu_Bot_CreateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create Bot`)
};

const zh_feishu_bot_create = /** @type {(inputs: Feishu_Bot_CreateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建 Bot`)
};

/**
* | output |
* | --- |
* | "Create Bot" |
*
* @param {Feishu_Bot_CreateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_create = /** @type {((inputs?: Feishu_Bot_CreateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_CreateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_create(inputs)
	return zh_feishu_bot_create(inputs)
});