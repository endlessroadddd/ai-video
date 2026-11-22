/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Session_ExpiredInputs */

const en_telegram_settings_session_expired = /** @type {(inputs: Telegram_Settings_Session_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram session has expired. Please sign in again.`)
};

const zh_telegram_settings_session_expired = /** @type {(inputs: Telegram_Settings_Session_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram 会话已过期，请重新登录。`)
};

/**
* | output |
* | --- |
* | "Telegram session has expired. Please sign in again." |
*
* @param {Telegram_Settings_Session_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_session_expired = /** @type {((inputs?: Telegram_Settings_Session_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Session_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_session_expired(inputs)
	return zh_telegram_settings_session_expired(inputs)
});