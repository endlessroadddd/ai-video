/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Remove_OwnerInputs */

const en_member_management_remove_owner = /** @type {(inputs: Member_Management_Remove_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner cannot be removed`)
};

const zh_member_management_remove_owner = /** @type {(inputs: Member_Management_Remove_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner 不可删除`)
};

/**
* | output |
* | --- |
* | "Owner cannot be removed" |
*
* @param {Member_Management_Remove_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_remove_owner = /** @type {((inputs?: Member_Management_Remove_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Remove_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_remove_owner(inputs)
	return zh_member_management_remove_owner(inputs)
});