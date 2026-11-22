/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_List_TitleInputs */

const en_assist_tasks_list_title = /** @type {(inputs: Assist_Tasks_List_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event List`)
};

const zh_assist_tasks_list_title = /** @type {(inputs: Assist_Tasks_List_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件列表`)
};

/**
* | output |
* | --- |
* | "Event List" |
*
* @param {Assist_Tasks_List_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_list_title = /** @type {((inputs?: Assist_Tasks_List_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_List_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_list_title(inputs)
	return zh_assist_tasks_list_title(inputs)
});