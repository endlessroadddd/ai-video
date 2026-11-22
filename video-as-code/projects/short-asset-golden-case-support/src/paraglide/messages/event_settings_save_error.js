/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Save_ErrorInputs */

const en_event_settings_save_error = /** @type {(inputs: Event_Settings_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save event type config. Please try again later.`)
};

const zh_event_settings_save_error = /** @type {(inputs: Event_Settings_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存事件类型配置失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to save event type config. Please try again later." |
*
* @param {Event_Settings_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_save_error = /** @type {((inputs?: Event_Settings_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_save_error(inputs)
	return zh_event_settings_save_error(inputs)
});