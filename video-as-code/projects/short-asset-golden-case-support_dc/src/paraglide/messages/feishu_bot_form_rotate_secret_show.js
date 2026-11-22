/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_ShowInputs */

const en_feishu_bot_form_rotate_secret_show = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_ShowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rotate`)
};

const zh_feishu_bot_form_rotate_secret_show = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_ShowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更换密钥`)
};

/**
* | output |
* | --- |
* | "Rotate" |
*
* @param {Feishu_Bot_Form_Rotate_Secret_ShowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotate_secret_show = /** @type {((inputs?: Feishu_Bot_Form_Rotate_Secret_ShowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotate_Secret_ShowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_rotate_secret_show(inputs)
	return zh_feishu_bot_form_rotate_secret_show(inputs)
});