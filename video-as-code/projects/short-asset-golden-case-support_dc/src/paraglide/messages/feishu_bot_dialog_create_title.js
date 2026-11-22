/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Dialog_Create_TitleInputs */

const en_feishu_bot_dialog_create_title = /** @type {(inputs: Feishu_Bot_Dialog_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Feishu Bot`)
};

const zh_feishu_bot_dialog_create_title = /** @type {(inputs: Feishu_Bot_Dialog_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增 Feishu Bot`)
};

/**
* | output |
* | --- |
* | "Add Feishu Bot" |
*
* @param {Feishu_Bot_Dialog_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_dialog_create_title = /** @type {((inputs?: Feishu_Bot_Dialog_Create_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Dialog_Create_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_dialog_create_title(inputs)
	return zh_feishu_bot_dialog_create_title(inputs)
});