/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Empty_Readonly_HintInputs */

const en_feishu_bot_empty_readonly_hint = /** @type {(inputs: Feishu_Bot_Empty_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No Feishu bot has been configured for this company yet.`)
};

const zh_feishu_bot_empty_readonly_hint = /** @type {(inputs: Feishu_Bot_Empty_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前公司还没有配置 Feishu Bot。`)
};

/**
* | output |
* | --- |
* | "No Feishu bot has been configured for this company yet." |
*
* @param {Feishu_Bot_Empty_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_empty_readonly_hint = /** @type {((inputs?: Feishu_Bot_Empty_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Empty_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_empty_readonly_hint(inputs)
	return zh_feishu_bot_empty_readonly_hint(inputs)
});