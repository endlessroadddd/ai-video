/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Notification_TargetsInputs */

const en_event_settings_notification_targets = /** @type {(inputs: Event_Settings_Notification_TargetsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notification targets`)
};

const zh_event_settings_notification_targets = /** @type {(inputs: Event_Settings_Notification_TargetsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通知目标`)
};

/**
* | output |
* | --- |
* | "Notification targets" |
*
* @param {Event_Settings_Notification_TargetsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notification_targets = /** @type {((inputs?: Event_Settings_Notification_TargetsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notification_TargetsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_notification_targets(inputs)
	return zh_event_settings_notification_targets(inputs)
});