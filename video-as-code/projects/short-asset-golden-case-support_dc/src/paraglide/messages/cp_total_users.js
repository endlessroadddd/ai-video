/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Total_UsersInputs */

const en_cp_total_users = /** @type {(inputs: Cp_Total_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total Users`)
};

const zh_cp_total_users = /** @type {(inputs: Cp_Total_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区总人数`)
};

/**
* | output |
* | --- |
* | "Total Users" |
*
* @param {Cp_Total_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_total_users = /** @type {((inputs?: Cp_Total_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Total_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_total_users(inputs)
	return zh_cp_total_users(inputs)
});