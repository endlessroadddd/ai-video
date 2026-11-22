/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Assigned_Channels_CountInputs */

const en_feishu_bot_assigned_channels_count = /** @type {(inputs: Feishu_Bot_Assigned_Channels_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} channel(s)`)
};

const zh_feishu_bot_assigned_channels_count = /** @type {(inputs: Feishu_Bot_Assigned_Channels_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个频道`)
};

/**
* | output |
* | --- |
* | "{count} channel(s)" |
*
* @param {Feishu_Bot_Assigned_Channels_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_assigned_channels_count = /** @type {((inputs: Feishu_Bot_Assigned_Channels_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Assigned_Channels_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_assigned_channels_count(inputs)
	return zh_feishu_bot_assigned_channels_count(inputs)
});