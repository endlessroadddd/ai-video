/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Fallback_NameInputs */

const en_member_management_fallback_name = /** @type {(inputs: Member_Management_Fallback_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member`)
};

const zh_member_management_fallback_name = /** @type {(inputs: Member_Management_Fallback_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成员`)
};

/**
* | output |
* | --- |
* | "Member" |
*
* @param {Member_Management_Fallback_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_fallback_name = /** @type {((inputs?: Member_Management_Fallback_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Fallback_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_fallback_name(inputs)
	return zh_member_management_fallback_name(inputs)
});