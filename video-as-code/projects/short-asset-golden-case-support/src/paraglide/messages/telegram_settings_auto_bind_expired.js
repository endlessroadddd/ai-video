/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Auto_Bind_ExpiredInputs */

const en_telegram_settings_auto_bind_expired = /** @type {(inputs: Telegram_Settings_Auto_Bind_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The automatic binding intent has expired. Please sign in again and retry.`)
};

const zh_telegram_settings_auto_bind_expired = /** @type {(inputs: Telegram_Settings_Auto_Bind_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动绑定意图已过期，请重新登录后再试。`)
};

/**
* | output |
* | --- |
* | "The automatic binding intent has expired. Please sign in again and retry." |
*
* @param {Telegram_Settings_Auto_Bind_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_expired = /** @type {((inputs?: Telegram_Settings_Auto_Bind_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_auto_bind_expired(inputs)
	return zh_telegram_settings_auto_bind_expired(inputs)
});