/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Status_JoinedInputs */

const en_member_management_status_joined = /** @type {(inputs: Member_Management_Status_JoinedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Joined`)
};

const zh_member_management_status_joined = /** @type {(inputs: Member_Management_Status_JoinedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已加入`)
};

/**
* | output |
* | --- |
* | "Joined" |
*
* @param {Member_Management_Status_JoinedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_status_joined = /** @type {((inputs?: Member_Management_Status_JoinedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Status_JoinedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_status_joined(inputs)
	return zh_member_management_status_joined(inputs)
});