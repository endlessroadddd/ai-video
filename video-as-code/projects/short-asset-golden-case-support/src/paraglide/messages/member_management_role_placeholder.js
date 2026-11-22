/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Role_PlaceholderInputs */

const en_member_management_role_placeholder = /** @type {(inputs: Member_Management_Role_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select role`)
};

const zh_member_management_role_placeholder = /** @type {(inputs: Member_Management_Role_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择权限`)
};

/**
* | output |
* | --- |
* | "Select role" |
*
* @param {Member_Management_Role_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_placeholder = /** @type {((inputs?: Member_Management_Role_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_role_placeholder(inputs)
	return zh_member_management_role_placeholder(inputs)
});