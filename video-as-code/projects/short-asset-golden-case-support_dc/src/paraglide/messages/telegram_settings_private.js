/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_PrivateInputs */

const en_telegram_settings_private = /** @type {(inputs: Telegram_Settings_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Private`)
};

const zh_telegram_settings_private = /** @type {(inputs: Telegram_Settings_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私聊`)
};

/**
* | output |
* | --- |
* | "Private" |
*
* @param {Telegram_Settings_PrivateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_private = /** @type {((inputs?: Telegram_Settings_PrivateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_PrivateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_private(inputs)
	return zh_telegram_settings_private(inputs)
});