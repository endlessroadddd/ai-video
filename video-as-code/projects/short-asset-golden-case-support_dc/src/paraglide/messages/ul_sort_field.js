/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Sort_FieldInputs */

const en_ul_sort_field = /** @type {(inputs: Ul_Sort_FieldInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sort by`)
};

const zh_ul_sort_field = /** @type {(inputs: Ul_Sort_FieldInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`排序字段`)
};

/**
* | output |
* | --- |
* | "Sort by" |
*
* @param {Ul_Sort_FieldInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_field = /** @type {((inputs?: Ul_Sort_FieldInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_FieldInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_sort_field(inputs)
	return zh_ul_sort_field(inputs)
});