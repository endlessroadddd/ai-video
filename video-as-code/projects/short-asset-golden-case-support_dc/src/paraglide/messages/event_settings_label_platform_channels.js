/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Label_Platform_ChannelsInputs */

const en_event_settings_label_platform_channels = /** @type {(inputs: Event_Settings_Label_Platform_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platform notification channels (multi-select)`)
};

const zh_event_settings_label_platform_channels = /** @type {(inputs: Event_Settings_Label_Platform_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台通知频道（多选）`)
};

/**
* | output |
* | --- |
* | "Platform notification channels (multi-select)" |
*
* @param {Event_Settings_Label_Platform_ChannelsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_platform_channels = /** @type {((inputs?: Event_Settings_Label_Platform_ChannelsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Platform_ChannelsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_label_platform_channels(inputs)
	return zh_event_settings_label_platform_channels(inputs)
});