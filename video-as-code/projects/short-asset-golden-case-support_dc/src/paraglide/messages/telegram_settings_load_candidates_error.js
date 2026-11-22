/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Load_Candidates_ErrorInputs */

const en_telegram_settings_load_candidates_error = /** @type {(inputs: Telegram_Settings_Load_Candidates_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Telegram community list.`)
};

const zh_telegram_settings_load_candidates_error = /** @type {(inputs: Telegram_Settings_Load_Candidates_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Telegram 群列表失败。`)
};

/**
* | output |
* | --- |
* | "Failed to load Telegram community list." |
*
* @param {Telegram_Settings_Load_Candidates_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_load_candidates_error = /** @type {((inputs?: Telegram_Settings_Load_Candidates_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Load_Candidates_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_load_candidates_error(inputs)
	return zh_telegram_settings_load_candidates_error(inputs)
});