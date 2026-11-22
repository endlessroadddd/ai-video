/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Channels_Not_LoadedInputs */

const en_event_settings_channels_not_loaded = /** @type {(inputs: Event_Settings_Channels_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The channel list is still loading. Please refresh and try again.`)
};

const zh_event_settings_channels_not_loaded = /** @type {(inputs: Event_Settings_Channels_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`频道列表尚未加载完成，请刷新后重试。`)
};

/**
* | output |
* | --- |
* | "The channel list is still loading. Please refresh and try again." |
*
* @param {Event_Settings_Channels_Not_LoadedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_channels_not_loaded = /** @type {((inputs?: Event_Settings_Channels_Not_LoadedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Channels_Not_LoadedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_channels_not_loaded(inputs)
	return zh_event_settings_channels_not_loaded(inputs)
});