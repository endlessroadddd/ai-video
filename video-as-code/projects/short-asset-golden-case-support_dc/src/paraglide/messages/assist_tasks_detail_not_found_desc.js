/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Detail_Not_Found_DescInputs */

const en_assist_tasks_detail_not_found_desc = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This event does not exist under the current company, or you do not have permission to view it.`)
};

const zh_assist_tasks_detail_not_found_desc = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前公司下不存在这个事件，或者你没有查看权限。`)
};

/**
* | output |
* | --- |
* | "This event does not exist under the current company, or you do not have permission to view it." |
*
* @param {Assist_Tasks_Detail_Not_Found_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_detail_not_found_desc = /** @type {((inputs?: Assist_Tasks_Detail_Not_Found_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Detail_Not_Found_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_detail_not_found_desc(inputs)
	return zh_assist_tasks_detail_not_found_desc(inputs)
});