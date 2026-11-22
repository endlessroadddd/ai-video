/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Type_Not_FoundInputs */

const en_event_settings_type_not_found = /** @type {(inputs: Event_Settings_Type_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This event type was not found.`)
};

const zh_event_settings_type_not_found = /** @type {(inputs: Event_Settings_Type_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到该事件类型。`)
};

/**
* | output |
* | --- |
* | "This event type was not found." |
*
* @param {Event_Settings_Type_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_type_not_found = /** @type {((inputs?: Event_Settings_Type_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Type_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_type_not_found(inputs)
	return zh_event_settings_type_not_found(inputs)
});