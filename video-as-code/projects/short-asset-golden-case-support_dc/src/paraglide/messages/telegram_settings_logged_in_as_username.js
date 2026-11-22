/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown>, username: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_UsernameInputs */

const en_telegram_settings_logged_in_as_username = /** @type {(inputs: Telegram_Settings_Logged_In_As_UsernameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Signed in as: ${i?.name} (@${i?.username})`)
};

const zh_telegram_settings_logged_in_as_username = /** @type {(inputs: Telegram_Settings_Logged_In_As_UsernameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已登录：${i?.name} (@${i?.username})`)
};

/**
* | output |
* | --- |
* | "Signed in as: {name} (@{username})" |
*
* @param {Telegram_Settings_Logged_In_As_UsernameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_logged_in_as_username = /** @type {((inputs: Telegram_Settings_Logged_In_As_UsernameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Logged_In_As_UsernameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_logged_in_as_username(inputs)
	return zh_telegram_settings_logged_in_as_username(inputs)
});