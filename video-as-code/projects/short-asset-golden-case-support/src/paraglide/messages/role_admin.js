/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_AdminInputs */

const en_role_admin = /** @type {(inputs: Role_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin`)
};

const zh_role_admin = /** @type {(inputs: Role_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin`)
};

/**
* | output |
* | --- |
* | "Admin" |
*
* @param {Role_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_admin = /** @type {((inputs?: Role_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_admin(inputs)
	return zh_role_admin(inputs)
});