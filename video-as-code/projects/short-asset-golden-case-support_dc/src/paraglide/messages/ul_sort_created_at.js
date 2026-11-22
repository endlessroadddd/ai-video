/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Sort_Created_AtInputs */

const en_ul_sort_created_at = /** @type {(inputs: Ul_Sort_Created_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Created At`)
};

const zh_ul_sort_created_at = /** @type {(inputs: Ul_Sort_Created_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建时间`)
};

/**
* | output |
* | --- |
* | "Created At" |
*
* @param {Ul_Sort_Created_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_created_at = /** @type {((inputs?: Ul_Sort_Created_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Created_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_sort_created_at(inputs)
	return zh_ul_sort_created_at(inputs)
});