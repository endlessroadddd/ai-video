/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Step_Add_BotInputs */

const en_telegram_settings_step_add_bot = /** @type {(inputs: Telegram_Settings_Step_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. Add the bot to a community`)
};

const zh_telegram_settings_step_add_bot = /** @type {(inputs: Telegram_Settings_Step_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. 添加 bot 到社区`)
};

/**
* | output |
* | --- |
* | "2. Add the bot to a community" |
*
* @param {Telegram_Settings_Step_Add_BotInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_step_add_bot = /** @type {((inputs?: Telegram_Settings_Step_Add_BotInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Step_Add_BotInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_step_add_bot(inputs)
	return zh_telegram_settings_step_add_bot(inputs)
});