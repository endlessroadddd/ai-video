/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Supplemental_PlaceholderInputs */

const en_assist_tasks_supplemental_placeholder = /** @type {(inputs: Assist_Tasks_Supplemental_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter supplemental knowledge...`)
};

const zh_assist_tasks_supplemental_placeholder = /** @type {(inputs: Assist_Tasks_Supplemental_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入补充知识...`)
};

/**
* | output |
* | --- |
* | "Enter supplemental knowledge..." |
*
* @param {Assist_Tasks_Supplemental_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_supplemental_placeholder = /** @type {((inputs?: Assist_Tasks_Supplemental_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Supplemental_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_supplemental_placeholder(inputs)
	return zh_assist_tasks_supplemental_placeholder(inputs)
});