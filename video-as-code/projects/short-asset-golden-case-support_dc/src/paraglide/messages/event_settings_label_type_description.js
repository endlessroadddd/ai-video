/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Label_Type_DescriptionInputs */

const en_event_settings_label_type_description = /** @type {(inputs: Event_Settings_Label_Type_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type description`)
};

const zh_event_settings_label_type_description = /** @type {(inputs: Event_Settings_Label_Type_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型描述`)
};

/**
* | output |
* | --- |
* | "Type description" |
*
* @param {Event_Settings_Label_Type_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_type_description = /** @type {((inputs?: Event_Settings_Label_Type_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_Type_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_label_type_description(inputs)
	return zh_event_settings_label_type_description(inputs)
});