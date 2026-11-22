/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_App_Secret_LabelInputs */

const en_feishu_bot_form_app_secret_label = /** @type {(inputs: Feishu_Bot_Form_App_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App Secret`)
};

const zh_feishu_bot_form_app_secret_label = /** @type {(inputs: Feishu_Bot_Form_App_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App Secret`)
};

/**
* | output |
* | --- |
* | "App Secret" |
*
* @param {Feishu_Bot_Form_App_Secret_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_app_secret_label = /** @type {((inputs?: Feishu_Bot_Form_App_Secret_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_App_Secret_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_app_secret_label(inputs)
	return zh_feishu_bot_form_app_secret_label(inputs)
});