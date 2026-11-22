/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ range: NonNullable<unknown> }} Cp_New_Users_HelperInputs */

const en_cp_new_users_helper = /** @type {(inputs: Cp_New_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Accumulated in ${i?.range}`)
};

const zh_cp_new_users_helper = /** @type {(inputs: Cp_New_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.range} 内累计新增`)
};

/**
* | output |
* | --- |
* | "Accumulated in {range}" |
*
* @param {Cp_New_Users_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_new_users_helper = /** @type {((inputs: Cp_New_Users_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_New_Users_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_new_users_helper(inputs)
	return zh_cp_new_users_helper(inputs)
});