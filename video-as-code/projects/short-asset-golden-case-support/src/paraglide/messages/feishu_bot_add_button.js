/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Add_ButtonInputs */

const en_feishu_bot_add_button = /** @type {(inputs: Feishu_Bot_Add_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Bot`)
};

const zh_feishu_bot_add_button = /** @type {(inputs: Feishu_Bot_Add_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增 Bot`)
};

/**
* | output |
* | --- |
* | "Add Bot" |
*
* @param {Feishu_Bot_Add_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_add_button = /** @type {((inputs?: Feishu_Bot_Add_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Add_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_add_button(inputs)
	return zh_feishu_bot_add_button(inputs)
});