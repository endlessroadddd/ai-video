/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Integration_DisabledInputs */

const en_telegram_settings_integration_disabled = /** @type {(inputs: Telegram_Settings_Integration_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram integration is not enabled in the current environment.`)
};

const zh_telegram_settings_integration_disabled = /** @type {(inputs: Telegram_Settings_Integration_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前环境未启用 Telegram 集成。`)
};

/**
* | output |
* | --- |
* | "Telegram integration is not enabled in the current environment." |
*
* @param {Telegram_Settings_Integration_DisabledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_integration_disabled = /** @type {((inputs?: Telegram_Settings_Integration_DisabledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Integration_DisabledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_integration_disabled(inputs)
	return zh_telegram_settings_integration_disabled(inputs)
});