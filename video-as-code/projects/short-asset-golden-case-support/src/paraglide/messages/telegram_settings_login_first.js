/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Login_FirstInputs */

const en_telegram_settings_login_first = /** @type {(inputs: Telegram_Settings_Login_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please complete Telegram sign-in first.`)
};

const zh_telegram_settings_login_first = /** @type {(inputs: Telegram_Settings_Login_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先完成 Telegram 登录。`)
};

/**
* | output |
* | --- |
* | "Please complete Telegram sign-in first." |
*
* @param {Telegram_Settings_Login_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_login_first = /** @type {((inputs?: Telegram_Settings_Login_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Login_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_login_first(inputs)
	return zh_telegram_settings_login_first(inputs)
});