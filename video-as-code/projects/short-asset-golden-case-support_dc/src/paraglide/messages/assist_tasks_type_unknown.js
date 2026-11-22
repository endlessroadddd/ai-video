/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_UnknownInputs */

const en_assist_tasks_type_unknown = /** @type {(inputs: Assist_Tasks_Type_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Other Issue`)
};

const zh_assist_tasks_type_unknown = /** @type {(inputs: Assist_Tasks_Type_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`其他问题`)
};

/**
* | output |
* | --- |
* | "Other Issue" |
*
* @param {Assist_Tasks_Type_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_unknown = /** @type {((inputs?: Assist_Tasks_Type_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_unknown(inputs)
	return zh_assist_tasks_type_unknown(inputs)
});