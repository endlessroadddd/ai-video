/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_SubmittingInputs */

const en_feishu_bot_form_submitting = /** @type {(inputs: Feishu_Bot_Form_SubmittingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving...`)
};

const zh_feishu_bot_form_submitting = /** @type {(inputs: Feishu_Bot_Form_SubmittingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中...`)
};

/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Feishu_Bot_Form_SubmittingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_submitting = /** @type {((inputs?: Feishu_Bot_Form_SubmittingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_SubmittingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_submitting(inputs)
	return zh_feishu_bot_form_submitting(inputs)
});