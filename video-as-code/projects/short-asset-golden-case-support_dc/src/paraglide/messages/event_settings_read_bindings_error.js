/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Read_Bindings_ErrorInputs */

const en_event_settings_read_bindings_error = /** @type {(inputs: Event_Settings_Read_Bindings_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read member account bindings.`)
};

const zh_event_settings_read_bindings_error = /** @type {(inputs: Event_Settings_Read_Bindings_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取成员绑定账号失败。`)
};

/**
* | output |
* | --- |
* | "Failed to read member account bindings." |
*
* @param {Event_Settings_Read_Bindings_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_read_bindings_error = /** @type {((inputs?: Event_Settings_Read_Bindings_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Read_Bindings_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_read_bindings_error(inputs)
	return zh_event_settings_read_bindings_error(inputs)
});