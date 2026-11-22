/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Back_To_ListInputs */

const en_event_settings_back_to_list = /** @type {(inputs: Event_Settings_Back_To_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to type list`)
};

const zh_event_settings_back_to_list = /** @type {(inputs: Event_Settings_Back_To_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回类型列表`)
};

/**
* | output |
* | --- |
* | "Back to type list" |
*
* @param {Event_Settings_Back_To_ListInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_back_to_list = /** @type {((inputs?: Event_Settings_Back_To_ListInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Back_To_ListInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_back_to_list(inputs)
	return zh_event_settings_back_to_list(inputs)
});