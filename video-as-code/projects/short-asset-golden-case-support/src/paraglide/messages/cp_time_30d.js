/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Time_30dInputs */

const en_cp_time_30d = /** @type {(inputs: Cp_Time_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last 30 days`)
};

const zh_cp_time_30d = /** @type {(inputs: Cp_Time_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30 天内`)
};

/**
* | output |
* | --- |
* | "Last 30 days" |
*
* @param {Cp_Time_30dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_time_30d = /** @type {((inputs?: Cp_Time_30dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Time_30dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_time_30d(inputs)
	return zh_cp_time_30d(inputs)
});