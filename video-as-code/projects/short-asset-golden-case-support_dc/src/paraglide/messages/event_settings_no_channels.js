/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_No_ChannelsInputs */

const en_event_settings_no_channels = /** @type {(inputs: Event_Settings_No_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available channels.`)
};

const zh_event_settings_no_channels = /** @type {(inputs: Event_Settings_No_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无可选频道。`)
};

/**
* | output |
* | --- |
* | "No available channels." |
*
* @param {Event_Settings_No_ChannelsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_no_channels = /** @type {((inputs?: Event_Settings_No_ChannelsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_No_ChannelsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_no_channels(inputs)
	return zh_event_settings_no_channels(inputs)
});