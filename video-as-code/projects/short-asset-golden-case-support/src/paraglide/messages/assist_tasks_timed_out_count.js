/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Timed_Out_CountInputs */

const en_assist_tasks_timed_out_count = /** @type {(inputs: Assist_Tasks_Timed_Out_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Timed Out (${i?.count})`)
};

const zh_assist_tasks_timed_out_count = /** @type {(inputs: Assist_Tasks_Timed_Out_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超时 (${i?.count})`)
};

/**
* | output |
* | --- |
* | "Timed Out ({count})" |
*
* @param {Assist_Tasks_Timed_Out_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_timed_out_count = /** @type {((inputs: Assist_Tasks_Timed_Out_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Timed_Out_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_timed_out_count(inputs)
	return zh_assist_tasks_timed_out_count(inputs)
});