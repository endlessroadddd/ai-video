/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Connected_HintInputs */

const en_feishu_bot_summary_connected_hint = /** @type {(inputs: Feishu_Bot_Summary_Connected_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} bot(s) configured`)
};

const zh_feishu_bot_summary_connected_hint = /** @type {(inputs: Feishu_Bot_Summary_Connected_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已配置 ${i?.count} 个 Bot`)
};

/**
* | output |
* | --- |
* | "{count} bot(s) configured" |
*
* @param {Feishu_Bot_Summary_Connected_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_connected_hint = /** @type {((inputs: Feishu_Bot_Summary_Connected_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Connected_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_summary_connected_hint(inputs)
	return zh_feishu_bot_summary_connected_hint(inputs)
});