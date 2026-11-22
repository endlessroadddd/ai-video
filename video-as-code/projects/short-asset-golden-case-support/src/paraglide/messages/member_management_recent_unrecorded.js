/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Recent_UnrecordedInputs */

const en_member_management_recent_unrecorded = /** @type {(inputs: Member_Management_Recent_UnrecordedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No record`)
};

const zh_member_management_recent_unrecorded = /** @type {(inputs: Member_Management_Recent_UnrecordedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未记录`)
};

/**
* | output |
* | --- |
* | "No record" |
*
* @param {Member_Management_Recent_UnrecordedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_recent_unrecorded = /** @type {((inputs?: Member_Management_Recent_UnrecordedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Recent_UnrecordedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_recent_unrecorded(inputs)
	return zh_member_management_recent_unrecorded(inputs)
});