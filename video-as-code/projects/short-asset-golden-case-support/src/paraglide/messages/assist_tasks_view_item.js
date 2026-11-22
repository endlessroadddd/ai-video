/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ title: NonNullable<unknown> }} Assist_Tasks_View_ItemInputs */

const en_assist_tasks_view_item = /** @type {(inputs: Assist_Tasks_View_ItemInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`View task: ${i?.title}`)
};

const zh_assist_tasks_view_item = /** @type {(inputs: Assist_Tasks_View_ItemInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`查看协助任务：${i?.title}`)
};

/**
* | output |
* | --- |
* | "View task: {title}" |
*
* @param {Assist_Tasks_View_ItemInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_view_item = /** @type {((inputs: Assist_Tasks_View_ItemInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_View_ItemInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_view_item(inputs)
	return zh_assist_tasks_view_item(inputs)
});