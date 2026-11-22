/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Nav_Event_SettingsInputs */

const en_settings_nav_event_settings = /** @type {(inputs: Settings_Nav_Event_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event Settings`)
};

const zh_settings_nav_event_settings = /** @type {(inputs: Settings_Nav_Event_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件配置`)
};

/**
* | output |
* | --- |
* | "Event Settings" |
*
* @param {Settings_Nav_Event_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_event_settings = /** @type {((inputs?: Settings_Nav_Event_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Event_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_nav_event_settings(inputs)
	return zh_settings_nav_event_settings(inputs)
});