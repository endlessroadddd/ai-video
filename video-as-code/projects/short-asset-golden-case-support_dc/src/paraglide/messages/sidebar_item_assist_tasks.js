/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_Assist_TasksInputs */

const en_sidebar_item_assist_tasks = /** @type {(inputs: Sidebar_Item_Assist_TasksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks`)
};

const zh_sidebar_item_assist_tasks = /** @type {(inputs: Sidebar_Item_Assist_TasksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`协助任务`)
};

/**
* | output |
* | --- |
* | "Tasks" |
*
* @param {Sidebar_Item_Assist_TasksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_assist_tasks = /** @type {((inputs?: Sidebar_Item_Assist_TasksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Assist_TasksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_assist_tasks(inputs)
	return zh_sidebar_item_assist_tasks(inputs)
});