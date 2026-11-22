/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Time_7dInputs */

const en_cp_time_7d = /** @type {(inputs: Cp_Time_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last 7 days`)
};

const zh_cp_time_7d = /** @type {(inputs: Cp_Time_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7 天内`)
};

/**
* | output |
* | --- |
* | "Last 7 days" |
*
* @param {Cp_Time_7dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_time_7d = /** @type {((inputs?: Cp_Time_7dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Time_7dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_time_7d(inputs)
	return zh_cp_time_7d(inputs)
});