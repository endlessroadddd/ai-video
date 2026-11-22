/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_LoginInputs */

const en_telegram_settings_login = /** @type {(inputs: Telegram_Settings_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign in with Telegram`)
};

const zh_telegram_settings_login = /** @type {(inputs: Telegram_Settings_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 Telegram 登录`)
};

/**
* | output |
* | --- |
* | "Sign in with Telegram" |
*
* @param {Telegram_Settings_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_login = /** @type {((inputs?: Telegram_Settings_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_login(inputs)
	return zh_telegram_settings_login(inputs)
});