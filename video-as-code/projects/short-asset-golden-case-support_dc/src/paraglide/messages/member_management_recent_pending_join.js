/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Recent_Pending_JoinInputs */

const en_member_management_recent_pending_join = /** @type {(inputs: Member_Management_Recent_Pending_JoinInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending join`)
};

const zh_member_management_recent_pending_join = /** @type {(inputs: Member_Management_Recent_Pending_JoinInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待加入`)
};

/**
* | output |
* | --- |
* | "Pending join" |
*
* @param {Member_Management_Recent_Pending_JoinInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_recent_pending_join = /** @type {((inputs?: Member_Management_Recent_Pending_JoinInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Recent_Pending_JoinInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_recent_pending_join(inputs)
	return zh_member_management_recent_pending_join(inputs)
});