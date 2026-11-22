/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_GroupInputs */

const en_telegram_settings_group = /** @type {(inputs: Telegram_Settings_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Group`)
};

const zh_telegram_settings_group = /** @type {(inputs: Telegram_Settings_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`群组`)
};

/**
* | output |
* | --- |
* | "Group" |
*
* @param {Telegram_Settings_GroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_group = /** @type {((inputs?: Telegram_Settings_GroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_GroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_group(inputs)
	return zh_telegram_settings_group(inputs)
});