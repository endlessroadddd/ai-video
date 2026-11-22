/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Nav_Profile_SettingsInputs */

const en_settings_nav_profile_settings = /** @type {(inputs: Settings_Nav_Profile_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile`)
};

const zh_settings_nav_profile_settings = /** @type {(inputs: Settings_Nav_Profile_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`个人信息`)
};

/**
* | output |
* | --- |
* | "Profile" |
*
* @param {Settings_Nav_Profile_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_profile_settings = /** @type {((inputs?: Settings_Nav_Profile_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Profile_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_nav_profile_settings(inputs)
	return zh_settings_nav_profile_settings(inputs)
});