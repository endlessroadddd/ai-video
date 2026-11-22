/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Discord_Channel_CategoryInputs */

const en_discord_channel_category = /** @type {(inputs: Discord_Channel_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Category`)
};

const zh_discord_channel_category = /** @type {(inputs: Discord_Channel_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分类`)
};

/**
* | output |
* | --- |
* | "Category" |
*
* @param {Discord_Channel_CategoryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_category = /** @type {((inputs?: Discord_Channel_CategoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_CategoryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_discord_channel_category(inputs)
	return zh_discord_channel_category(inputs)
});