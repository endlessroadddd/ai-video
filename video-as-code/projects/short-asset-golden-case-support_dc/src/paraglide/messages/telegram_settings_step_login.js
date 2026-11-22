/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Step_LoginInputs */

const en_telegram_settings_step_login = /** @type {(inputs: Telegram_Settings_Step_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1. Sign in to Telegram`)
};

const zh_telegram_settings_step_login = /** @type {(inputs: Telegram_Settings_Step_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1. 登录 Telegram`)
};

/**
* | output |
* | --- |
* | "1. Sign in to Telegram" |
*
* @param {Telegram_Settings_Step_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_step_login = /** @type {((inputs?: Telegram_Settings_Step_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Step_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_step_login(inputs)
	return zh_telegram_settings_step_login(inputs)
});