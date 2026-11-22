/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Dialog_TitleInputs */

const en_telegram_settings_dialog_title = /** @type {(inputs: Telegram_Settings_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Telegram Community`)
};

const zh_telegram_settings_dialog_title = /** @type {(inputs: Telegram_Settings_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加 Telegram 社区`)
};

/**
* | output |
* | --- |
* | "Add Telegram Community" |
*
* @param {Telegram_Settings_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_dialog_title = /** @type {((inputs?: Telegram_Settings_Dialog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Dialog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_dialog_title(inputs)
	return zh_telegram_settings_dialog_title(inputs)
});