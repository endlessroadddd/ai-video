/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Assigned_Channels_TitleInputs */

const en_feishu_bot_assigned_channels_title = /** @type {(inputs: Feishu_Bot_Assigned_Channels_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assigned channels`)
};

const zh_feishu_bot_assigned_channels_title = /** @type {(inputs: Feishu_Bot_Assigned_Channels_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`归属频道`)
};

/**
* | output |
* | --- |
* | "Assigned channels" |
*
* @param {Feishu_Bot_Assigned_Channels_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_assigned_channels_title = /** @type {((inputs?: Feishu_Bot_Assigned_Channels_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Assigned_Channels_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_assigned_channels_title(inputs)
	return zh_feishu_bot_assigned_channels_title(inputs)
});