/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Auto_Bind_Success_NamedInputs */

const en_telegram_settings_auto_bind_success_named = /** @type {(inputs: Telegram_Settings_Auto_Bind_Success_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The Telegram community has been automatically linked: ${i?.name}`)
};

const zh_telegram_settings_auto_bind_success_named = /** @type {(inputs: Telegram_Settings_Auto_Bind_Success_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已自动绑定社区：${i?.name}`)
};

/**
* | output |
* | --- |
* | "The Telegram community has been automatically linked: {name}" |
*
* @param {Telegram_Settings_Auto_Bind_Success_NamedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_auto_bind_success_named = /** @type {((inputs: Telegram_Settings_Auto_Bind_Success_NamedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Auto_Bind_Success_NamedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_auto_bind_success_named(inputs)
	return zh_telegram_settings_auto_bind_success_named(inputs)
});