/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Ignore_Confirm_TitleInputs */

const en_assist_tasks_ignore_confirm_title = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignore this event?`)
};

const zh_assist_tasks_ignore_confirm_title = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认忽略该事件？`)
};

/**
* | output |
* | --- |
* | "Ignore this event?" |
*
* @param {Assist_Tasks_Ignore_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_confirm_title = /** @type {((inputs?: Assist_Tasks_Ignore_Confirm_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_Confirm_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_ignore_confirm_title(inputs)
	return zh_assist_tasks_ignore_confirm_title(inputs)
});