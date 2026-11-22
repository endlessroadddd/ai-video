/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_App_Id_PlaceholderInputs */

const en_feishu_bot_form_app_id_placeholder = /** @type {(inputs: Feishu_Bot_Form_App_Id_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`cli_xxx`)
};

const zh_feishu_bot_form_app_id_placeholder = /** @type {(inputs: Feishu_Bot_Form_App_Id_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`cli_xxx`)
};

/**
* | output |
* | --- |
* | "cli_xxx" |
*
* @param {Feishu_Bot_Form_App_Id_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_id_placeholder = /** @type {((inputs?: Feishu_Bot_Form_App_Id_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Id_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_app_id_placeholder(inputs)
	return zh_feishu_bot_form_app_id_placeholder(inputs)
});