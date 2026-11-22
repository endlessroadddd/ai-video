/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Discord_Channel_TextInputs */

const en_discord_channel_text = /** @type {(inputs: Discord_Channel_TextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Text`)
};

const zh_discord_channel_text = /** @type {(inputs: Discord_Channel_TextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文本`)
};

/**
* | output |
* | --- |
* | "Text" |
*
* @param {Discord_Channel_TextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_text = /** @type {((inputs?: Discord_Channel_TextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_TextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_discord_channel_text(inputs)
	return zh_discord_channel_text(inputs)
});