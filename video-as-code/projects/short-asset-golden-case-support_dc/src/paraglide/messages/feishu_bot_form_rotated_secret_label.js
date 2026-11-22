/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_LabelInputs */

const en_feishu_bot_form_rotated_secret_label = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New App Secret`)
};

const zh_feishu_bot_form_rotated_secret_label = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新的 App Secret`)
};

/**
* | output |
* | --- |
* | "New App Secret" |
*
* @param {Feishu_Bot_Form_Rotated_Secret_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotated_secret_label = /** @type {((inputs?: Feishu_Bot_Form_Rotated_Secret_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotated_Secret_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_rotated_secret_label(inputs)
	return zh_feishu_bot_form_rotated_secret_label(inputs)
});