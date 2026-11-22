/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Create_Session_ErrorInputs */

const en_telegram_settings_create_session_error = /** @type {(inputs: Telegram_Settings_Create_Session_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create Telegram integration session.`)
};

const zh_telegram_settings_create_session_error = /** @type {(inputs: Telegram_Settings_Create_Session_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建 Telegram 集成会话失败。`)
};

/**
* | output |
* | --- |
* | "Failed to create Telegram integration session." |
*
* @param {Telegram_Settings_Create_Session_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_create_session_error = /** @type {((inputs?: Telegram_Settings_Create_Session_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Create_Session_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_create_session_error(inputs)
	return zh_telegram_settings_create_session_error(inputs)
});