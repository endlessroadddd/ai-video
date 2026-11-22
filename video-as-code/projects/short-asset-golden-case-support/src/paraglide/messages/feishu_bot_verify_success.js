/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Verify_SuccessInputs */

const en_feishu_bot_verify_success = /** @type {(inputs: Feishu_Bot_Verify_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot verification started.`)
};

const zh_feishu_bot_verify_success = /** @type {(inputs: Feishu_Bot_Verify_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已触发 Feishu Bot 验证。`)
};

/**
* | output |
* | --- |
* | "Feishu bot verification started." |
*
* @param {Feishu_Bot_Verify_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_verify_success = /** @type {((inputs?: Feishu_Bot_Verify_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Verify_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_verify_success(inputs)
	return zh_feishu_bot_verify_success(inputs)
});