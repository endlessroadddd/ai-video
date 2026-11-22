/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Verifying_LoginInputs */

const en_telegram_settings_verifying_login = /** @type {(inputs: Telegram_Settings_Verifying_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verifying sign-in...`)
};

const zh_telegram_settings_verifying_login = /** @type {(inputs: Telegram_Settings_Verifying_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在验证登录...`)
};

/**
* | output |
* | --- |
* | "Verifying sign-in..." |
*
* @param {Telegram_Settings_Verifying_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_verifying_login = /** @type {((inputs?: Telegram_Settings_Verifying_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Verifying_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_verifying_login(inputs)
	return zh_telegram_settings_verifying_login(inputs)
});