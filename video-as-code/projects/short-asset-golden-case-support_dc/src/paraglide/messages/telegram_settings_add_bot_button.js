/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ username: NonNullable<unknown> }} Telegram_Settings_Add_Bot_ButtonInputs */

const en_telegram_settings_add_bot_button = /** @type {(inputs: Telegram_Settings_Add_Bot_ButtonInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Add @${i?.username}`)
};

const zh_telegram_settings_add_bot_button = /** @type {(inputs: Telegram_Settings_Add_Bot_ButtonInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`添加 @${i?.username}`)
};

/**
* | output |
* | --- |
* | "Add @{username}" |
*
* @param {Telegram_Settings_Add_Bot_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_add_bot_button = /** @type {((inputs: Telegram_Settings_Add_Bot_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Add_Bot_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_add_bot_button(inputs)
	return zh_telegram_settings_add_bot_button(inputs)
});