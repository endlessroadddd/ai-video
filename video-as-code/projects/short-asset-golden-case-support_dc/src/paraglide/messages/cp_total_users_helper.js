/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Total_Users_HelperInputs */

const en_cp_total_users_helper = /** @type {(inputs: Cp_Total_Users_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total community size`)
};

const zh_cp_total_users_helper = /** @type {(inputs: Cp_Total_Users_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`截至当前总规模`)
};

/**
* | output |
* | --- |
* | "Total community size" |
*
* @param {Cp_Total_Users_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_total_users_helper = /** @type {((inputs?: Cp_Total_Users_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Total_Users_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_total_users_helper(inputs)
	return zh_cp_total_users_helper(inputs)
});