/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Unrecognized_InformationInputs */

const en_assist_tasks_type_unrecognized_information = /** @type {(inputs: Assist_Tasks_Type_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unrecognized Information`)
};

const zh_assist_tasks_type_unrecognized_information = /** @type {(inputs: Assist_Tasks_Type_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法识别信息`)
};

/**
* | output |
* | --- |
* | "Unrecognized Information" |
*
* @param {Assist_Tasks_Type_Unrecognized_InformationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_unrecognized_information = /** @type {((inputs?: Assist_Tasks_Type_Unrecognized_InformationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Unrecognized_InformationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_unrecognized_information(inputs)
	return zh_assist_tasks_type_unrecognized_information(inputs)
});