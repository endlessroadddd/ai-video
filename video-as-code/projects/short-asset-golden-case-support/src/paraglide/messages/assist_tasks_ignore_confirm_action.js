/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Ignore_Confirm_ActionInputs */

const en_assist_tasks_ignore_confirm_action = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm Ignore`)
};

const zh_assist_tasks_ignore_confirm_action = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认忽略`)
};

/**
* | output |
* | --- |
* | "Confirm Ignore" |
*
* @param {Assist_Tasks_Ignore_Confirm_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_confirm_action = /** @type {((inputs?: Assist_Tasks_Ignore_Confirm_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_Confirm_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_ignore_confirm_action(inputs)
	return zh_assist_tasks_ignore_confirm_action(inputs)
});