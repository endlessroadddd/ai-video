/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HintInputs */

const en_feishu_bot_form_rotate_secret_hint = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only enter a new secret when you need to replace the current one.`)
};

const zh_feishu_bot_form_rotate_secret_hint = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只有在需要替换当前密钥时才输入新的 secret。`)
};

/**
* | output |
* | --- |
* | "Only enter a new secret when you need to replace the current one." |
*
* @param {Feishu_Bot_Form_Rotate_Secret_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotate_secret_hint = /** @type {((inputs?: Feishu_Bot_Form_Rotate_Secret_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotate_Secret_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_rotate_secret_hint(inputs)
	return zh_feishu_bot_form_rotate_secret_hint(inputs)
});