/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_HoursInputs */

const en_assist_tasks_overdue_hours = /** @type {(inputs: Assist_Tasks_Overdue_HoursInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Overdue ${i?.count} hour(s)`)
};

const zh_assist_tasks_overdue_hours = /** @type {(inputs: Assist_Tasks_Overdue_HoursInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超时 ${i?.count} 小时`)
};

/**
* | output |
* | --- |
* | "Overdue {count} hour(s)" |
*
* @param {Assist_Tasks_Overdue_HoursInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_overdue_hours = /** @type {((inputs: Assist_Tasks_Overdue_HoursInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Overdue_HoursInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_overdue_hours(inputs)
	return zh_assist_tasks_overdue_hours(inputs)
});