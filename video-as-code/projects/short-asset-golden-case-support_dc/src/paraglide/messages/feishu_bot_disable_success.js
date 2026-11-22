/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Disable_SuccessInputs */

const en_feishu_bot_disable_success = /** @type {(inputs: Feishu_Bot_Disable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot disabled.`)
};

const zh_feishu_bot_disable_success = /** @type {(inputs: Feishu_Bot_Disable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu Bot 已停用。`)
};

/**
* | output |
* | --- |
* | "Feishu bot disabled." |
*
* @param {Feishu_Bot_Disable_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_disable_success = /** @type {((inputs?: Feishu_Bot_Disable_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Disable_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_disable_success(inputs)
	return zh_feishu_bot_disable_success(inputs)
});