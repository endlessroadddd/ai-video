/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_Default_LabelInputs */

const en_feishu_bot_form_default_label = /** @type {(inputs: Feishu_Bot_Form_Default_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set as default bot`)
};

const zh_feishu_bot_form_default_label = /** @type {(inputs: Feishu_Bot_Form_Default_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设为默认 Bot`)
};

/**
* | output |
* | --- |
* | "Set as default bot" |
*
* @param {Feishu_Bot_Form_Default_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_default_label = /** @type {((inputs?: Feishu_Bot_Form_Default_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Default_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_default_label(inputs)
	return zh_feishu_bot_form_default_label(inputs)
});