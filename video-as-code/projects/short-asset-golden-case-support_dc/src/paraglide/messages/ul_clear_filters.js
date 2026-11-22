/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Clear_FiltersInputs */

const en_ul_clear_filters = /** @type {(inputs: Ul_Clear_FiltersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear Filters`)
};

const zh_ul_clear_filters = /** @type {(inputs: Ul_Clear_FiltersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清空筛选`)
};

/**
* | output |
* | --- |
* | "Clear Filters" |
*
* @param {Ul_Clear_FiltersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_clear_filters = /** @type {((inputs?: Ul_Clear_FiltersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Clear_FiltersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_clear_filters(inputs)
	return zh_ul_clear_filters(inputs)
});