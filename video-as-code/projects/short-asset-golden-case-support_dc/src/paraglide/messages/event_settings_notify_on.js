/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Notify_OnInputs */

const en_event_settings_notify_on = /** @type {(inputs: Event_Settings_Notify_OnInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notify`)
};

const zh_event_settings_notify_on = /** @type {(inputs: Event_Settings_Notify_OnInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通知`)
};

/**
* | output |
* | --- |
* | "Notify" |
*
* @param {Event_Settings_Notify_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notify_on = /** @type {((inputs?: Event_Settings_Notify_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notify_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_notify_on(inputs)
	return zh_event_settings_notify_on(inputs)
});