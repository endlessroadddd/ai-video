/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Create_Binding_Intent_ErrorInputs */

const en_telegram_settings_create_binding_intent_error = /** @type {(inputs: Telegram_Settings_Create_Binding_Intent_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create Telegram binding intent.`)
};

const zh_telegram_settings_create_binding_intent_error = /** @type {(inputs: Telegram_Settings_Create_Binding_Intent_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建 Telegram 绑定意图失败。`)
};

/**
* | output |
* | --- |
* | "Failed to create Telegram binding intent." |
*
* @param {Telegram_Settings_Create_Binding_Intent_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_create_binding_intent_error = /** @type {((inputs?: Telegram_Settings_Create_Binding_Intent_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Create_Binding_Intent_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_create_binding_intent_error(inputs)
	return zh_telegram_settings_create_binding_intent_error(inputs)
});