/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Auto_Bind_IncompleteInputs */

const en_telegram_settings_auto_bind_incomplete = /** @type {(inputs: Telegram_Settings_Auto_Bind_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automatic binding is not complete yet. Check whether the bot has joined the target community, then try again.`)
};

const zh_telegram_settings_auto_bind_incomplete = /** @type {(inputs: Telegram_Settings_Auto_Bind_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动绑定未完成，请检查 bot 是否已加入目标社区后重试。`)
};

/**
* | output |
* | --- |
* | "Automatic binding is not complete yet. Check whether the bot has joined the target community, then try again." |
*
* @param {Telegram_Settings_Auto_Bind_IncompleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_incomplete = /** @type {((inputs?: Telegram_Settings_Auto_Bind_IncompleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_IncompleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_auto_bind_incomplete(inputs)
	return zh_telegram_settings_auto_bind_incomplete(inputs)
});