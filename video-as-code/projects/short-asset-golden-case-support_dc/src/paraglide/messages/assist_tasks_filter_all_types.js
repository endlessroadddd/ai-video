/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Filter_All_TypesInputs */

const en_assist_tasks_filter_all_types = /** @type {(inputs: Assist_Tasks_Filter_All_TypesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Types`)
};

const zh_assist_tasks_filter_all_types = /** @type {(inputs: Assist_Tasks_Filter_All_TypesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部类型`)
};

/**
* | output |
* | --- |
* | "All Types" |
*
* @param {Assist_Tasks_Filter_All_TypesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_all_types = /** @type {((inputs?: Assist_Tasks_Filter_All_TypesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_All_TypesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_filter_all_types(inputs)
	return zh_assist_tasks_filter_all_types(inputs)
});