/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Time_14dInputs */

const en_cp_time_14d = /** @type {(inputs: Cp_Time_14dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last 14 days`)
};

const zh_cp_time_14d = /** @type {(inputs: Cp_Time_14dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`14 天内`)
};

/**
* | output |
* | --- |
* | "Last 14 days" |
*
* @param {Cp_Time_14dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_time_14d = /** @type {((inputs?: Cp_Time_14dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Time_14dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_time_14d(inputs)
	return zh_cp_time_14d(inputs)
});