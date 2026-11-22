/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_UnknownInputs */

const en_role_unknown = /** @type {(inputs: Role_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown`)
};

const zh_role_unknown = /** @type {(inputs: Role_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知`)
};

/**
* | output |
* | --- |
* | "Unknown" |
*
* @param {Role_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_unknown = /** @type {((inputs?: Role_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_unknown(inputs)
	return zh_role_unknown(inputs)
});