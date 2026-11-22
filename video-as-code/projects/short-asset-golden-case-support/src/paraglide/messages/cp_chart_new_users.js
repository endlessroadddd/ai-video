/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Chart_New_UsersInputs */

const en_cp_chart_new_users = /** @type {(inputs: Cp_Chart_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New Users Trend`)
};

const zh_cp_chart_new_users = /** @type {(inputs: Cp_Chart_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增用户走势`)
};

/**
* | output |
* | --- |
* | "New Users Trend" |
*
* @param {Cp_Chart_New_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_chart_new_users = /** @type {((inputs?: Cp_Chart_New_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Chart_New_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_chart_new_users(inputs)
	return zh_cp_chart_new_users(inputs)
});