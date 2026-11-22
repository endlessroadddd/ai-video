/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_RequiredInputs */

const en_feishu_bot_form_rotated_secret_required = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter the replacement secret.`)
};

const zh_feishu_bot_form_rotated_secret_required = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入新的 App Secret。`)
};

/**
* | output |
* | --- |
* | "Please enter the replacement secret." |
*
* @param {Feishu_Bot_Form_Rotated_Secret_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotated_secret_required = /** @type {((inputs?: Feishu_Bot_Form_Rotated_Secret_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotated_Secret_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_rotated_secret_required(inputs)
	return zh_feishu_bot_form_rotated_secret_required(inputs)
});