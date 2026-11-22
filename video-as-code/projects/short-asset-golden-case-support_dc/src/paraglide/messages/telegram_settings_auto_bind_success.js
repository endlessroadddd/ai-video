/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Auto_Bind_SuccessInputs */

const en_telegram_settings_auto_bind_success = /** @type {(inputs: Telegram_Settings_Auto_Bind_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The Telegram community was automatically linked to the current company.`)
};

const zh_telegram_settings_auto_bind_success = /** @type {(inputs: Telegram_Settings_Auto_Bind_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram 社区已自动绑定到当前公司。`)
};

/**
* | output |
* | --- |
* | "The Telegram community was automatically linked to the current company." |
*
* @param {Telegram_Settings_Auto_Bind_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_success = /** @type {((inputs?: Telegram_Settings_Auto_Bind_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_auto_bind_success(inputs)
	return zh_telegram_settings_auto_bind_success(inputs)
});