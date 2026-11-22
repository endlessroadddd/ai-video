/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Trigger_Select_ChannelInputs */

const en_event_settings_trigger_select_channel = /** @type {(inputs: Event_Settings_Trigger_Select_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select platform channels`)
};

const zh_event_settings_trigger_select_channel = /** @type {(inputs: Event_Settings_Trigger_Select_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择平台频道`)
};

/**
* | output |
* | --- |
* | "Select platform channels" |
*
* @param {Event_Settings_Trigger_Select_ChannelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_trigger_select_channel = /** @type {((inputs?: Event_Settings_Trigger_Select_ChannelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Trigger_Select_ChannelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_trigger_select_channel(inputs)
	return zh_event_settings_trigger_select_channel(inputs)
});