/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Label_Type_KeyInputs */

const en_event_settings_label_type_key = /** @type {(inputs: Event_Settings_Label_Type_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type key`)
};

const zh_event_settings_label_type_key = /** @type {(inputs: Event_Settings_Label_Type_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型 Key`)
};

/**
* | output |
* | --- |
* | "Type key" |
*
* @param {Event_Settings_Label_Type_KeyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_type_key = /** @type {((inputs?: Event_Settings_Label_Type_KeyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Type_KeyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_label_type_key(inputs)
	return zh_event_settings_label_type_key(inputs)
});