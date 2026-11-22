/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Channels_Bound_HintInputs */

const en_feishu_bot_summary_channels_bound_hint = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} unassigned channel(s)`)
};

const zh_feishu_bot_summary_channels_bound_hint = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个频道未归属`)
};

/**
* | output |
* | --- |
* | "{count} unassigned channel(s)" |
*
* @param {Feishu_Bot_Summary_Channels_Bound_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_channels_bound_hint = /** @type {((inputs: Feishu_Bot_Summary_Channels_Bound_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Channels_Bound_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_summary_channels_bound_hint(inputs)
	return zh_feishu_bot_summary_channels_bound_hint(inputs)
});