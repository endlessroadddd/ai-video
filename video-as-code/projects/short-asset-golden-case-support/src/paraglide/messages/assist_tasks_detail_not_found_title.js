/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Detail_Not_Found_TitleInputs */

const en_assist_tasks_detail_not_found_title = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event not found`)
};

const zh_assist_tasks_detail_not_found_title = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到该事件`)
};

/**
* | output |
* | --- |
* | "Event not found" |
*
* @param {Assist_Tasks_Detail_Not_Found_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_detail_not_found_title = /** @type {((inputs?: Assist_Tasks_Detail_Not_Found_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Detail_Not_Found_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_detail_not_found_title(inputs)
	return zh_assist_tasks_detail_not_found_title(inputs)
});