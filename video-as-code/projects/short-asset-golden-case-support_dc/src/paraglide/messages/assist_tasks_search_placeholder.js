/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Search_PlaceholderInputs */

const en_assist_tasks_search_placeholder = /** @type {(inputs: Assist_Tasks_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search keyword`)
};

const zh_assist_tasks_search_placeholder = /** @type {(inputs: Assist_Tasks_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索关键词`)
};

/**
* | output |
* | --- |
* | "Search keyword" |
*
* @param {Assist_Tasks_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_search_placeholder = /** @type {((inputs?: Assist_Tasks_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_search_placeholder(inputs)
	return zh_assist_tasks_search_placeholder(inputs)
});