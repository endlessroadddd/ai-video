/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Notify_Disabled_HintInputs */

const en_event_settings_notify_disabled_hint = /** @type {(inputs: Event_Settings_Notify_Disabled_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When turned off, this event type will not notify responsible members.`)
};

const zh_event_settings_notify_disabled_hint = /** @type {(inputs: Event_Settings_Notify_Disabled_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭后，当前事件类型不会发送负责人通知。`)
};

/**
* | output |
* | --- |
* | "When turned off, this event type will not notify responsible members." |
*
* @param {Event_Settings_Notify_Disabled_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_notify_disabled_hint = /** @type {((inputs?: Event_Settings_Notify_Disabled_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Notify_Disabled_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_notify_disabled_hint(inputs)
	return zh_event_settings_notify_disabled_hint(inputs)
});