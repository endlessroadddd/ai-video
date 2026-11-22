/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_ChannelInputs */

const en_telegram_settings_channel = /** @type {(inputs: Telegram_Settings_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channel`)
};

const zh_telegram_settings_channel = /** @type {(inputs: Telegram_Settings_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`频道`)
};

/**
* | output |
* | --- |
* | "Channel" |
*
* @param {Telegram_Settings_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_channel = /** @type {((inputs?: Telegram_Settings_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_channel(inputs)
	return zh_telegram_settings_channel(inputs)
});