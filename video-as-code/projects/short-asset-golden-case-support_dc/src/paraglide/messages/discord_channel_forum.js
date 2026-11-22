/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Discord_Channel_ForumInputs */

const en_discord_channel_forum = /** @type {(inputs: Discord_Channel_ForumInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Forum`)
};

const zh_discord_channel_forum = /** @type {(inputs: Discord_Channel_ForumInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`论坛`)
};

/**
* | output |
* | --- |
* | "Forum" |
*
* @param {Discord_Channel_ForumInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_forum = /** @type {((inputs?: Discord_Channel_ForumInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_ForumInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_discord_channel_forum(inputs)
	return zh_discord_channel_forum(inputs)
});