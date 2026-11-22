/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Sort_Last_UpdatedInputs */

const en_ul_sort_last_updated = /** @type {(inputs: Ul_Sort_Last_UpdatedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Updated`)
};

const zh_ul_sort_last_updated = /** @type {(inputs: Ul_Sort_Last_UpdatedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近更新`)
};

/**
* | output |
* | --- |
* | "Last Updated" |
*
* @param {Ul_Sort_Last_UpdatedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_last_updated = /** @type {((inputs?: Ul_Sort_Last_UpdatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_Last_UpdatedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_sort_last_updated(inputs)
	return zh_ul_sort_last_updated(inputs)
});