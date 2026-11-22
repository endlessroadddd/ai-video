/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Action_VerifyingInputs */

const en_feishu_bot_action_verifying = /** @type {(inputs: Feishu_Bot_Action_VerifyingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verifying...`)
};

const zh_feishu_bot_action_verifying = /** @type {(inputs: Feishu_Bot_Action_VerifyingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证中...`)
};

/**
* | output |
* | --- |
* | "Verifying..." |
*
* @param {Feishu_Bot_Action_VerifyingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_verifying = /** @type {((inputs?: Feishu_Bot_Action_VerifyingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_VerifyingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_action_verifying(inputs)
	return zh_feishu_bot_action_verifying(inputs)
});