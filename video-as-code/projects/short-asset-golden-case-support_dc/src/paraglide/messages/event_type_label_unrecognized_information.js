/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Type_Label_Unrecognized_InformationInputs */

const en_event_type_label_unrecognized_information = /** @type {(inputs: Event_Type_Label_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unrecognized Information`)
};

const zh_event_type_label_unrecognized_information = /** @type {(inputs: Event_Type_Label_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法识别信息`)
};

/**
* | output |
* | --- |
* | "Unrecognized Information" |
*
* @param {Event_Type_Label_Unrecognized_InformationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_unrecognized_information = /** @type {((inputs?: Event_Type_Label_Unrecognized_InformationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Unrecognized_InformationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_type_label_unrecognized_information(inputs)
	return zh_event_type_label_unrecognized_information(inputs)
});