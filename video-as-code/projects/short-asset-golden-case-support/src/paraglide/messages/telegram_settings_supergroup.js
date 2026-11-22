/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_SupergroupInputs */

const en_telegram_settings_supergroup = /** @type {(inputs: Telegram_Settings_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supergroup`)
};

const zh_telegram_settings_supergroup = /** @type {(inputs: Telegram_Settings_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超级群组`)
};

/**
* | output |
* | --- |
* | "Supergroup" |
*
* @param {Telegram_Settings_SupergroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_supergroup = /** @type {((inputs?: Telegram_Settings_SupergroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_SupergroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_supergroup(inputs)
	return zh_telegram_settings_supergroup(inputs)
});