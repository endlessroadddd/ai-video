/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Discord_Channel_StageInputs */

const en_discord_channel_stage = /** @type {(inputs: Discord_Channel_StageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stage`)
};

const zh_discord_channel_stage = /** @type {(inputs: Discord_Channel_StageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stage`)
};

/**
* | output |
* | --- |
* | "Stage" |
*
* @param {Discord_Channel_StageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_stage = /** @type {((inputs?: Discord_Channel_StageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_StageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_discord_channel_stage(inputs)
	return zh_discord_channel_stage(inputs)
});