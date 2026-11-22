/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Load_Bound_Channels_ErrorInputs */

const en_telegram_settings_load_bound_channels_error = /** @type {(inputs: Telegram_Settings_Load_Bound_Channels_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load bound Telegram communities.`)
};

const zh_telegram_settings_load_bound_channels_error = /** @type {(inputs: Telegram_Settings_Load_Bound_Channels_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取已绑定 Telegram 社区失败。`)
};

/**
* | output |
* | --- |
* | "Failed to load bound Telegram communities." |
*
* @param {Telegram_Settings_Load_Bound_Channels_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_load_bound_channels_error = /** @type {((inputs?: Telegram_Settings_Load_Bound_Channels_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Load_Bound_Channels_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_load_bound_channels_error(inputs)
	return zh_telegram_settings_load_bound_channels_error(inputs)
});