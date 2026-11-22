/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Status_ExpiredInputs */

const en_telegram_settings_status_expired = /** @type {(inputs: Telegram_Settings_Status_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expired`)
};

const zh_telegram_settings_status_expired = /** @type {(inputs: Telegram_Settings_Status_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已过期`)
};

/**
* | output |
* | --- |
* | "Expired" |
*
* @param {Telegram_Settings_Status_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_expired = /** @type {((inputs?: Telegram_Settings_Status_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_status_expired(inputs)
	return zh_telegram_settings_status_expired(inputs)
});