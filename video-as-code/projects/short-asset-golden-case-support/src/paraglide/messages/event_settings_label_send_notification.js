/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Label_Send_NotificationInputs */

const en_event_settings_label_send_notification = /** @type {(inputs: Event_Settings_Label_Send_NotificationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send notifications`)
};

const zh_event_settings_label_send_notification = /** @type {(inputs: Event_Settings_Label_Send_NotificationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送通知`)
};

/**
* | output |
* | --- |
* | "Send notifications" |
*
* @param {Event_Settings_Label_Send_NotificationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_send_notification = /** @type {((inputs?: Event_Settings_Label_Send_NotificationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Send_NotificationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_label_send_notification(inputs)
	return zh_event_settings_label_send_notification(inputs)
});