/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Assignee_LabelInputs */

const en_assist_tasks_assignee_label = /** @type {(inputs: Assist_Tasks_Assignee_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assignee`)
};

const zh_assist_tasks_assignee_label = /** @type {(inputs: Assist_Tasks_Assignee_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assignee`)
};

/**
* | output |
* | --- |
* | "Assignee" |
*
* @param {Assist_Tasks_Assignee_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_assignee_label = /** @type {((inputs?: Assist_Tasks_Assignee_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Assignee_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_assignee_label(inputs)
	return zh_assist_tasks_assignee_label(inputs)
});