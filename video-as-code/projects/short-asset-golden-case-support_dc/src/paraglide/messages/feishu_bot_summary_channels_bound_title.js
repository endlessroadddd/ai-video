/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Summary_Channels_Bound_TitleInputs */

const en_feishu_bot_summary_channels_bound_title = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channels Bound`)
};

const zh_feishu_bot_summary_channels_bound_title = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已绑定频道`)
};

/**
* | output |
* | --- |
* | "Channels Bound" |
*
* @param {Feishu_Bot_Summary_Channels_Bound_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_channels_bound_title = /** @type {((inputs?: Feishu_Bot_Summary_Channels_Bound_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Channels_Bound_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_summary_channels_bound_title(inputs)
	return zh_feishu_bot_summary_channels_bound_title(inputs)
});