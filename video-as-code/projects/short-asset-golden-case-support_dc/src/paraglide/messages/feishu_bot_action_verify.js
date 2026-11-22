/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Action_VerifyInputs */

const en_feishu_bot_action_verify = /** @type {(inputs: Feishu_Bot_Action_VerifyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verify`)
};

const zh_feishu_bot_action_verify = /** @type {(inputs: Feishu_Bot_Action_VerifyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证`)
};

/**
* | output |
* | --- |
* | "Verify" |
*
* @param {Feishu_Bot_Action_VerifyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_verify = /** @type {((inputs?: Feishu_Bot_Action_VerifyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_VerifyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_action_verify(inputs)
	return zh_feishu_bot_action_verify(inputs)
});