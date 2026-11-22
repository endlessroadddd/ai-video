/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Status_InvitedInputs */

const en_member_management_status_invited = /** @type {(inputs: Member_Management_Status_InvitedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invited`)
};

const zh_member_management_status_invited = /** @type {(inputs: Member_Management_Status_InvitedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待邀请`)
};

/**
* | output |
* | --- |
* | "Invited" |
*
* @param {Member_Management_Status_InvitedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_status_invited = /** @type {((inputs?: Member_Management_Status_InvitedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Status_InvitedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_status_invited(inputs)
	return zh_member_management_status_invited(inputs)
});