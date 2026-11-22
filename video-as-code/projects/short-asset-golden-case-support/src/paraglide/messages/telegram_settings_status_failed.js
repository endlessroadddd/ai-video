/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Status_FailedInputs */

const en_telegram_settings_status_failed = /** @type {(inputs: Telegram_Settings_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Binding failed`)
};

const zh_telegram_settings_status_failed = /** @type {(inputs: Telegram_Settings_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`绑定失败`)
};

/**
* | output |
* | --- |
* | "Binding failed" |
*
* @param {Telegram_Settings_Status_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_failed = /** @type {((inputs?: Telegram_Settings_Status_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_status_failed(inputs)
	return zh_telegram_settings_status_failed(inputs)
});