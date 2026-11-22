/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Status_PendingInputs */

const en_telegram_settings_status_pending = /** @type {(inputs: Telegram_Settings_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Waiting for bot to join`)
};

const zh_telegram_settings_status_pending = /** @type {(inputs: Telegram_Settings_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`等待 bot 入群`)
};

/**
* | output |
* | --- |
* | "Waiting for bot to join" |
*
* @param {Telegram_Settings_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_pending = /** @type {((inputs?: Telegram_Settings_Status_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_status_pending(inputs)
	return zh_telegram_settings_status_pending(inputs)
});