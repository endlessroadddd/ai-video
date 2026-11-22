/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_New_UsersInputs */

const en_cp_new_users = /** @type {(inputs: Cp_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New Users`)
};

const zh_cp_new_users = /** @type {(inputs: Cp_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区新增用户`)
};

/**
* | output |
* | --- |
* | "New Users" |
*
* @param {Cp_New_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_new_users = /** @type {((inputs?: Cp_New_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_New_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_new_users(inputs)
	return zh_cp_new_users(inputs)
});