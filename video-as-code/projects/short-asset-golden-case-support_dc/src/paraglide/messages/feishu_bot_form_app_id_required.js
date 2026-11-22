/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_App_Id_RequiredInputs */

const en_feishu_bot_form_app_id_required = /** @type {(inputs: Feishu_Bot_Form_App_Id_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter an App ID.`)
};

const zh_feishu_bot_form_app_id_required = /** @type {(inputs: Feishu_Bot_Form_App_Id_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入 App ID。`)
};

/**
* | output |
* | --- |
* | "Please enter an App ID." |
*
* @param {Feishu_Bot_Form_App_Id_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_id_required = /** @type {((inputs?: Feishu_Bot_Form_App_Id_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Id_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_app_id_required(inputs)
	return zh_feishu_bot_form_app_id_required(inputs)
});