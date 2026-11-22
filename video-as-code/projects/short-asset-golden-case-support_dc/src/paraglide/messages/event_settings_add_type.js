/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Add_TypeInputs */

const en_event_settings_add_type = /** @type {(inputs: Event_Settings_Add_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add type`)
};

const zh_event_settings_add_type = /** @type {(inputs: Event_Settings_Add_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增类型`)
};

/**
* | output |
* | --- |
* | "Add type" |
*
* @param {Event_Settings_Add_TypeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_add_type = /** @type {((inputs?: Event_Settings_Add_TypeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Add_TypeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_add_type(inputs)
	return zh_event_settings_add_type(inputs)
});