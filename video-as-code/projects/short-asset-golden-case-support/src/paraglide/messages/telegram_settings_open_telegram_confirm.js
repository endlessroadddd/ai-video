/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Open_Telegram_ConfirmInputs */

const en_telegram_settings_open_telegram_confirm = /** @type {(inputs: Telegram_Settings_Open_Telegram_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram has been opened. Please confirm adding the bot in the target community.`)
};

const zh_telegram_settings_open_telegram_confirm = /** @type {(inputs: Telegram_Settings_Open_Telegram_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已打开 Telegram，请在目标社区中确认添加 bot。`)
};

/**
* | output |
* | --- |
* | "Telegram has been opened. Please confirm adding the bot in the target community." |
*
* @param {Telegram_Settings_Open_Telegram_ConfirmInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_open_telegram_confirm = /** @type {((inputs?: Telegram_Settings_Open_Telegram_ConfirmInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Open_Telegram_ConfirmInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_open_telegram_confirm(inputs)
	return zh_telegram_settings_open_telegram_confirm(inputs)
});