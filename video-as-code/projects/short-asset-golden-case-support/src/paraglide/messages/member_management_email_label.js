/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Email_LabelInputs */

const en_member_management_email_label = /** @type {(inputs: Member_Management_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

const zh_member_management_email_label = /** @type {(inputs: Member_Management_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱`)
};

/**
* | output |
* | --- |
* | "Email" |
*
* @param {Member_Management_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_email_label = /** @type {((inputs?: Member_Management_Email_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Email_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_email_label(inputs)
	return zh_member_management_email_label(inputs)
});