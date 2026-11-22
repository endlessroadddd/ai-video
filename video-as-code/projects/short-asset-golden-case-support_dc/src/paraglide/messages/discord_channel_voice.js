/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Discord_Channel_VoiceInputs */

const en_discord_channel_voice = /** @type {(inputs: Discord_Channel_VoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voice`)
};

const zh_discord_channel_voice = /** @type {(inputs: Discord_Channel_VoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语音`)
};

/**
* | output |
* | --- |
* | "Voice" |
*
* @param {Discord_Channel_VoiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_voice = /** @type {((inputs?: Discord_Channel_VoiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_VoiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_discord_channel_voice(inputs)
	return zh_discord_channel_voice(inputs)
});