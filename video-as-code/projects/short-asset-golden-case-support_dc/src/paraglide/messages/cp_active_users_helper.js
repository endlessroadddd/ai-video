/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ range: NonNullable<unknown> }} Cp_Active_Users_HelperInputs */

const en_cp_active_users_helper = /** @type {(inputs: Cp_Active_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Active in ${i?.range}`)
};

const zh_cp_active_users_helper = /** @type {(inputs: Cp_Active_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.range} 内活跃表现`)
};

/**
* | output |
* | --- |
* | "Active in {range}" |
*
* @param {Cp_Active_Users_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_active_users_helper = /** @type {((inputs: Cp_Active_Users_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Active_Users_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_active_users_helper(inputs)
	return zh_cp_active_users_helper(inputs)
});