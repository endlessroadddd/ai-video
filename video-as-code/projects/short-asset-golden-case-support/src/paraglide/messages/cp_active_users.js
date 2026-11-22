/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Active_UsersInputs */

const en_cp_active_users = /** @type {(inputs: Cp_Active_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active Users`)
};

const zh_cp_active_users = /** @type {(inputs: Cp_Active_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区活跃用户`)
};

/**
* | output |
* | --- |
* | "Active Users" |
*
* @param {Cp_Active_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_active_users = /** @type {((inputs?: Cp_Active_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Active_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_active_users(inputs)
	return zh_cp_active_users(inputs)
});