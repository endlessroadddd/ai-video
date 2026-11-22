/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ channelId: NonNullable<unknown> }} Ul_ChannelInputs */

const en_ul_channel = /** @type {(inputs: Ul_ChannelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Channel ${i?.channelId}`)
};

const zh_ul_channel = /** @type {(inputs: Ul_ChannelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`频道 ${i?.channelId}`)
};

/**
* | output |
* | --- |
* | "Channel {channelId}" |
*
* @param {Ul_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_channel = /** @type {((inputs: Ul_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_channel(inputs)
	return zh_ul_channel(inputs)
});