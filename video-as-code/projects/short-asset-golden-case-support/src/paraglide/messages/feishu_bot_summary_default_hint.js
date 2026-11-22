/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Summary_Default_HintInputs */

const en_feishu_bot_summary_default_hint = /** @type {(inputs: Feishu_Bot_Summary_Default_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No default bot yet`)
};

const zh_feishu_bot_summary_default_hint = /** @type {(inputs: Feishu_Bot_Summary_Default_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有默认 Bot`)
};

/**
* | output |
* | --- |
* | "No default bot yet" |
*
* @param {Feishu_Bot_Summary_Default_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_default_hint = /** @type {((inputs?: Feishu_Bot_Summary_Default_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Default_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_summary_default_hint(inputs)
	return zh_feishu_bot_summary_default_hint(inputs)
});