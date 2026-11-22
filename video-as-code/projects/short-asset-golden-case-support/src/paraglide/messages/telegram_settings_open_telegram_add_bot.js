/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Open_Telegram_Add_BotInputs */

const en_telegram_settings_open_telegram_add_bot = /** @type {(inputs: Telegram_Settings_Open_Telegram_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram has been opened. Please add the bot to the target community.`)
};

const zh_telegram_settings_open_telegram_add_bot = /** @type {(inputs: Telegram_Settings_Open_Telegram_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已打开 Telegram，请将 bot 添加到目标社区。`)
};

/**
* | output |
* | --- |
* | "Telegram has been opened. Please add the bot to the target community." |
*
* @param {Telegram_Settings_Open_Telegram_Add_BotInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_open_telegram_add_bot = /** @type {((inputs?: Telegram_Settings_Open_Telegram_Add_BotInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Open_Telegram_Add_BotInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_open_telegram_add_bot(inputs)
	return zh_telegram_settings_open_telegram_add_bot(inputs)
});