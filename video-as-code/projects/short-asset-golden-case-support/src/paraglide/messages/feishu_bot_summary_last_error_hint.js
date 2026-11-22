/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Summary_Last_Error_HintInputs */

const en_feishu_bot_summary_last_error_hint = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bots that currently need attention`)
};

const zh_feishu_bot_summary_last_error_hint = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前需要关注的异常 Bot 数`)
};

/**
* | output |
* | --- |
* | "Bots that currently need attention" |
*
* @param {Feishu_Bot_Summary_Last_Error_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_last_error_hint = /** @type {((inputs?: Feishu_Bot_Summary_Last_Error_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Last_Error_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_summary_last_error_hint(inputs)
	return zh_feishu_bot_summary_last_error_hint(inputs)
});