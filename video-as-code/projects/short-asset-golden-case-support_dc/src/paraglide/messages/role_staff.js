/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_StaffInputs */

const en_role_staff = /** @type {(inputs: Role_StaffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Staff`)
};

const zh_role_staff = /** @type {(inputs: Role_StaffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Staff`)
};

/**
* | output |
* | --- |
* | "Staff" |
*
* @param {Role_StaffInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_staff = /** @type {((inputs?: Role_StaffInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_StaffInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_staff(inputs)
	return zh_role_staff(inputs)
});