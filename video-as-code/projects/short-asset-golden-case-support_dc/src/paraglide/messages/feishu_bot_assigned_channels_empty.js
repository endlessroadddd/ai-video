/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Assigned_Channels_EmptyInputs */

const en_feishu_bot_assigned_channels_empty = /** @type {(inputs: Feishu_Bot_Assigned_Channels_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No channels are currently routed to this bot.`)
};

const zh_feishu_bot_assigned_channels_empty = /** @type {(inputs: Feishu_Bot_Assigned_Channels_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有频道路由到这个 Bot。`)
};

/**
* | output |
* | --- |
* | "No channels are currently routed to this bot." |
*
* @param {Feishu_Bot_Assigned_Channels_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_assigned_channels_empty = /** @type {((inputs?: Feishu_Bot_Assigned_Channels_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Assigned_Channels_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_assigned_channels_empty(inputs)
	return zh_feishu_bot_assigned_channels_empty(inputs)
});