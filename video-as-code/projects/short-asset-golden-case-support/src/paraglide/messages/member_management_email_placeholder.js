/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Email_PlaceholderInputs */

const en_member_management_email_placeholder = /** @type {(inputs: Member_Management_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`member@example.com`)
};

const zh_member_management_email_placeholder = /** @type {(inputs: Member_Management_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`member@example.com`)
};

/**
* | output |
* | --- |
* | "member@example.com" |
*
* @param {Member_Management_Email_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_email_placeholder = /** @type {((inputs?: Member_Management_Email_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Email_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_email_placeholder(inputs)
	return zh_member_management_email_placeholder(inputs)
});