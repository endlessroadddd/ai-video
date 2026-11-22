/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown> }} Ul_Showing_RangeInputs */

const en_ul_showing_range = /** @type {(inputs: Ul_Showing_RangeInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Showing ${i?.start}-${i?.end}`)
};

const zh_ul_showing_range = /** @type {(inputs: Ul_Showing_RangeInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`当前显示 ${i?.start}-${i?.end}`)
};

/**
* | output |
* | --- |
* | "Showing {start}-{end}" |
*
* @param {Ul_Showing_RangeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_showing_range = /** @type {((inputs: Ul_Showing_RangeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Showing_RangeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_showing_range(inputs)
	return zh_ul_showing_range(inputs)
});