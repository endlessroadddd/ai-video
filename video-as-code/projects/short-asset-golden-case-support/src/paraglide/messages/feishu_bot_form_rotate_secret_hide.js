/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HideInputs */

const en_feishu_bot_form_rotate_secret_hide = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HideInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel rotate`)
};

const zh_feishu_bot_form_rotate_secret_hide = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HideInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消更换`)
};

/**
* | output |
* | --- |
* | "Cancel rotate" |
*
* @param {Feishu_Bot_Form_Rotate_Secret_HideInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_form_rotate_secret_hide = /** @type {((inputs?: Feishu_Bot_Form_Rotate_Secret_HideInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Form_Rotate_Secret_HideInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_form_rotate_secret_hide(inputs)
	return zh_feishu_bot_form_rotate_secret_hide(inputs)
});