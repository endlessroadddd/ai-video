/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Overdue_DefaultInputs */

const en_assist_tasks_overdue_default = /** @type {(inputs: Assist_Tasks_Overdue_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overdue`)
};

const zh_assist_tasks_overdue_default = /** @type {(inputs: Assist_Tasks_Overdue_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已超时`)
};

/**
* | output |
* | --- |
* | "Overdue" |
*
* @param {Assist_Tasks_Overdue_DefaultInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_overdue_default = /** @type {((inputs?: Assist_Tasks_Overdue_DefaultInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Overdue_DefaultInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_overdue_default(inputs)
	return zh_assist_tasks_overdue_default(inputs)
});