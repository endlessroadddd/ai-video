/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_System_BadgeInputs */

const en_event_settings_system_badge = /** @type {(inputs: Event_Settings_System_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`System`)
};

const zh_event_settings_system_badge = /** @type {(inputs: Event_Settings_System_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`系统`)
};

/**
* | output |
* | --- |
* | "System" |
*
* @param {Event_Settings_System_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_system_badge = /** @type {((inputs?: Event_Settings_System_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_System_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_system_badge(inputs)
	return zh_event_settings_system_badge(inputs)
});