/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invalid_EmailInputs */

const en_member_management_invalid_email = /** @type {(inputs: Member_Management_Invalid_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a valid email address.`)
};

const zh_member_management_invalid_email = /** @type {(inputs: Member_Management_Invalid_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入合法邮箱地址。`)
};

/**
* | output |
* | --- |
* | "Please enter a valid email address." |
*
* @param {Member_Management_Invalid_EmailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invalid_email = /** @type {((inputs?: Member_Management_Invalid_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invalid_EmailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invalid_email(inputs)
	return zh_member_management_invalid_email(inputs)
});