/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Write_Target_ErrorInputs */

const en_event_settings_write_target_error = /** @type {(inputs: Event_Settings_Write_Target_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to write notification targets.`)
};

const zh_event_settings_write_target_error = /** @type {(inputs: Event_Settings_Write_Target_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`写入通知目标失败。`)
};

/**
* | output |
* | --- |
* | "Failed to write notification targets." |
*
* @param {Event_Settings_Write_Target_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_write_target_error = /** @type {((inputs?: Event_Settings_Write_Target_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Write_Target_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_write_target_error(inputs)
	return zh_event_settings_write_target_error(inputs)
});