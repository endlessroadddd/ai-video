/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Add_SupplementalInputs */

const en_assist_tasks_add_supplemental = /** @type {(inputs: Assist_Tasks_Add_SupplementalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Supplemental Knowledge`)
};

const zh_assist_tasks_add_supplemental = /** @type {(inputs: Assist_Tasks_Add_SupplementalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`补充知识库`)
};

/**
* | output |
* | --- |
* | "Add Supplemental Knowledge" |
*
* @param {Assist_Tasks_Add_SupplementalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_add_supplemental = /** @type {((inputs?: Assist_Tasks_Add_SupplementalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Add_SupplementalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_add_supplemental(inputs)
	return zh_assist_tasks_add_supplemental(inputs)
});