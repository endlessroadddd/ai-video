/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Summary_Connected_TitleInputs */

const en_feishu_bot_summary_connected_title = /** @type {(inputs: Feishu_Bot_Summary_Connected_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connected Bots`)
};

const zh_feishu_bot_summary_connected_title = /** @type {(inputs: Feishu_Bot_Summary_Connected_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已连接 Bot`)
};

/**
* | output |
* | --- |
* | "Connected Bots" |
*
* @param {Feishu_Bot_Summary_Connected_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_summary_connected_title = /** @type {((inputs?: Feishu_Bot_Summary_Connected_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Summary_Connected_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_summary_connected_title(inputs)
	return zh_feishu_bot_summary_connected_title(inputs)
});