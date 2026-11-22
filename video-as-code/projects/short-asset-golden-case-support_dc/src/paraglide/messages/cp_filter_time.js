/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Filter_TimeInputs */

const en_cp_filter_time = /** @type {(inputs: Cp_Filter_TimeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Time`)
};

const zh_cp_filter_time = /** @type {(inputs: Cp_Filter_TimeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`时间`)
};

/**
* | output |
* | --- |
* | "Time" |
*
* @param {Cp_Filter_TimeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_filter_time = /** @type {((inputs?: Cp_Filter_TimeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Filter_TimeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_filter_time(inputs)
	return zh_cp_filter_time(inputs)
});