/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Notify_OffInputs */

const en_event_settings_notify_off = /** @type {(inputs: Event_Settings_Notify_OffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No notifications`)
};

const zh_event_settings_notify_off = /** @type {(inputs: Event_Settings_Notify_OffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不通知`)
};

/**
* | output |
* | --- |
* | "No notifications" |
*
* @param {Event_Settings_Notify_OffInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notify_off = /** @type {((inputs?: Event_Settings_Notify_OffInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notify_OffInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_notify_off(inputs)
	return zh_event_settings_notify_off(inputs)
});