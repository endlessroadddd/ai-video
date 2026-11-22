/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Sort_Last_SummaryInputs */

const en_ul_sort_last_summary = /** @type {(inputs: Ul_Sort_Last_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Summary`)
};

const zh_ul_sort_last_summary = /** @type {(inputs: Ul_Sort_Last_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近总结`)
};

/**
* | output |
* | --- |
* | "Last Summary" |
*
* @param {Ul_Sort_Last_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_last_summary = /** @type {((inputs?: Ul_Sort_Last_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Last_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_sort_last_summary(inputs)
	return zh_ul_sort_last_summary(inputs)
});