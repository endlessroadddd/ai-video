/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Discord_Channel_AnnouncementInputs */

const en_discord_channel_announcement = /** @type {(inputs: Discord_Channel_AnnouncementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Announcement`)
};

const zh_discord_channel_announcement = /** @type {(inputs: Discord_Channel_AnnouncementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公告`)
};

/**
* | output |
* | --- |
* | "Announcement" |
*
* @param {Discord_Channel_AnnouncementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const discord_channel_announcement = /** @type {((inputs?: Discord_Channel_AnnouncementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Discord_Channel_AnnouncementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_discord_channel_announcement(inputs)
	return zh_discord_channel_announcement(inputs)
});