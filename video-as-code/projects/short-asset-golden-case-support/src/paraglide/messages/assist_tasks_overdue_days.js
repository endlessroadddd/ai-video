/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_DaysInputs */

const en_assist_tasks_overdue_days = /** @type {(inputs: Assist_Tasks_Overdue_DaysInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Overdue ${i?.count} day(s)`)
};

const zh_assist_tasks_overdue_days = /** @type {(inputs: Assist_Tasks_Overdue_DaysInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超时 ${i?.count} 天`)
};

/**
* | output |
* | --- |
* | "Overdue {count} day(s)" |
*
* @param {Assist_Tasks_Overdue_DaysInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_overdue_days = /** @type {((inputs: Assist_Tasks_Overdue_DaysInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Overdue_DaysInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_overdue_days(inputs)
	return zh_assist_tasks_overdue_days(inputs)
});