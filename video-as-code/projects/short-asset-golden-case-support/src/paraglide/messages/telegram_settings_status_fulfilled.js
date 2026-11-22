/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Status_FulfilledInputs */

const en_telegram_settings_status_fulfilled = /** @type {(inputs: Telegram_Settings_Status_FulfilledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bound`)
};

const zh_telegram_settings_status_fulfilled = /** @type {(inputs: Telegram_Settings_Status_FulfilledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已完成绑定`)
};

/**
* | output |
* | --- |
* | "Bound" |
*
* @param {Telegram_Settings_Status_FulfilledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_status_fulfilled = /** @type {((inputs?: Telegram_Settings_Status_FulfilledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Status_FulfilledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_status_fulfilled(inputs)
	return zh_telegram_settings_status_fulfilled(inputs)
});