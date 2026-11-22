/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Read_Type_Config_ErrorInputs */

const en_event_settings_read_type_config_error = /** @type {(inputs: Event_Settings_Read_Type_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read event_type_config.`)
};

const zh_event_settings_read_type_config_error = /** @type {(inputs: Event_Settings_Read_Type_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 event_type_config 失败。`)
};

/**
* | output |
* | --- |
* | "Failed to read event_type_config." |
*
* @param {Event_Settings_Read_Type_Config_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_read_type_config_error = /** @type {((inputs?: Event_Settings_Read_Type_Config_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Read_Type_Config_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_read_type_config_error(inputs)
	return zh_event_settings_read_type_config_error(inputs)
});