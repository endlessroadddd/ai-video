/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Discord_Channel_DefaultInputs */

const en_discord_channel_default = /** @type {(inputs: Discord_Channel_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channel`)
};

const zh_discord_channel_default = /** @type {(inputs: Discord_Channel_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`频道`)
};

/**
* | output |
* | --- |
* | "Channel" |
*
* @param {Discord_Channel_DefaultInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_default = /** @type {((inputs?: Discord_Channel_DefaultInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_DefaultInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_discord_channel_default(inputs)
	return zh_discord_channel_default(inputs)
});