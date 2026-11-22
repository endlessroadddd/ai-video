/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Status_CancelledInputs */

const en_telegram_settings_status_cancelled = /** @type {(inputs: Telegram_Settings_Status_CancelledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancelled`)
};

const zh_telegram_settings_status_cancelled = /** @type {(inputs: Telegram_Settings_Status_CancelledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已取消`)
};

/**
* | output |
* | --- |
* | "Cancelled" |
*
* @param {Telegram_Settings_Status_CancelledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_cancelled = /** @type {((inputs?: Telegram_Settings_Status_CancelledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_CancelledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_status_cancelled(inputs)
	return zh_telegram_settings_status_cancelled(inputs)
});