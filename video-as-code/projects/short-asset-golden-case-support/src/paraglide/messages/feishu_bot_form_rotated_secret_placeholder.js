/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs */

const en_feishu_bot_form_rotated_secret_placeholder = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paste the replacement secret`)
};

const zh_feishu_bot_form_rotated_secret_placeholder = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入新的应用密钥`)
};

/**
* | output |
* | --- |
* | "Paste the replacement secret" |
*
* @param {Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotated_secret_placeholder = /** @type {((inputs?: Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_rotated_secret_placeholder(inputs)
	return zh_feishu_bot_form_rotated_secret_placeholder(inputs)
});