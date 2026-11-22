/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Save_Supplemental_SuccessInputs */

const en_assist_tasks_save_supplemental_success = /** @type {(inputs: Assist_Tasks_Save_Supplemental_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supplemental knowledge saved.`)
};

const zh_assist_tasks_save_supplemental_success = /** @type {(inputs: Assist_Tasks_Save_Supplemental_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`补充知识已保存。`)
};

/**
* | output |
* | --- |
* | "Supplemental knowledge saved." |
*
* @param {Assist_Tasks_Save_Supplemental_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_save_supplemental_success = /** @type {((inputs?: Assist_Tasks_Save_Supplemental_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Save_Supplemental_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_save_supplemental_success(inputs)
	return zh_assist_tasks_save_supplemental_success(inputs)
});