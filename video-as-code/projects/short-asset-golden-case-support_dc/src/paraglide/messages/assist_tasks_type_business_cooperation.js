/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Business_CooperationInputs */

const en_assist_tasks_type_business_cooperation = /** @type {(inputs: Assist_Tasks_Type_Business_CooperationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Business Cooperation`)
};

const zh_assist_tasks_type_business_cooperation = /** @type {(inputs: Assist_Tasks_Type_Business_CooperationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`商务合作`)
};

/**
* | output |
* | --- |
* | "Business Cooperation" |
*
* @param {Assist_Tasks_Type_Business_CooperationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_business_cooperation = /** @type {((inputs?: Assist_Tasks_Type_Business_CooperationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Business_CooperationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_business_cooperation(inputs)
	return zh_assist_tasks_type_business_cooperation(inputs)
});