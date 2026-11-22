/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_OwnerInputs */

const en_role_owner = /** @type {(inputs: Role_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

const zh_role_owner = /** @type {(inputs: Role_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

/**
* | output |
* | --- |
* | "Owner" |
*
* @param {Role_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_owner = /** @type {((inputs?: Role_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_owner(inputs)
	return zh_role_owner(inputs)
});