/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_UsersInputs */

const en_ul_total_users = /** @type {(inputs: Ul_Total_UsersInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} users total`)
};

const zh_ul_total_users = /** @type {(inputs: Ul_Total_UsersInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`共 ${i?.count} 位用户`)
};

/**
* | output |
* | --- |
* | "{count} users total" |
*
* @param {Ul_Total_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_total_users = /** @type {((inputs: Ul_Total_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Total_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_total_users(inputs)
	return zh_ul_total_users(inputs)
});