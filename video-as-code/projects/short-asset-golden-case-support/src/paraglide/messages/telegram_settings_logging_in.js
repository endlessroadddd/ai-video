/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Logging_InInputs */

const en_telegram_settings_logging_in = /** @type {(inputs: Telegram_Settings_Logging_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Signing in...`)
};

const zh_telegram_settings_logging_in = /** @type {(inputs: Telegram_Settings_Logging_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录中...`)
};

/**
* | output |
* | --- |
* | "Signing in..." |
*
* @param {Telegram_Settings_Logging_InInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_logging_in = /** @type {((inputs?: Telegram_Settings_Logging_InInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Logging_InInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_logging_in(inputs)
	return zh_telegram_settings_logging_in(inputs)
});