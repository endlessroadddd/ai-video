/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_NameInputs */

const en_telegram_settings_logged_in_as_name = /** @type {(inputs: Telegram_Settings_Logged_In_As_NameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Signed in as: ${i?.name}`)
};

const zh_telegram_settings_logged_in_as_name = /** @type {(inputs: Telegram_Settings_Logged_In_As_NameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已登录：${i?.name}`)
};

/**
* | output |
* | --- |
* | "Signed in as: {name}" |
*
* @param {Telegram_Settings_Logged_In_As_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_logged_in_as_name = /** @type {((inputs: Telegram_Settings_Logged_In_As_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Logged_In_As_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_logged_in_as_name(inputs)
	return zh_telegram_settings_logged_in_as_name(inputs)
});