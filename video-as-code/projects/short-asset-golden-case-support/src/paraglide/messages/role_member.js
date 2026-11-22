/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_MemberInputs */

const en_role_member = /** @type {(inputs: Role_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member`)
};

const zh_role_member = /** @type {(inputs: Role_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member`)
};

/**
* | output |
* | --- |
* | "Member" |
*
* @param {Role_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_member = /** @type {((inputs?: Role_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_member(inputs)
	return zh_role_member(inputs)
});