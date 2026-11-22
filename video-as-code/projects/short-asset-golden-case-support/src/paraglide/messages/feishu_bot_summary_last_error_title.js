/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Summary_Last_Error_TitleInputs */

const en_feishu_bot_summary_last_error_title = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Error Bots`)
};

const zh_feishu_bot_summary_last_error_title = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常 Bot`)
};

/**
* | output |
* | --- |
* | "Last Error Bots" |
*
* @param {Feishu_Bot_Summary_Last_Error_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_last_error_title = /** @type {((inputs?: Feishu_Bot_Summary_Last_Error_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Last_Error_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_summary_last_error_title(inputs)
	return zh_feishu_bot_summary_last_error_title(inputs)
});