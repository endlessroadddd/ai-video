/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Role_LabelInputs */

const en_member_management_role_label = /** @type {(inputs: Member_Management_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Role`)
};

const zh_member_management_role_label = /** @type {(inputs: Member_Management_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`权限`)
};

/**
* | output |
* | --- |
* | "Role" |
*
* @param {Member_Management_Role_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_label = /** @type {((inputs?: Member_Management_Role_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_role_label(inputs)
	return zh_member_management_role_label(inputs)
});