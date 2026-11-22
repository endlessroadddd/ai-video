/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_UnlinkedInputs */

const en_member_management_unlinked = /** @type {(inputs: Member_Management_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not linked`)
};

const zh_member_management_unlinked = /** @type {(inputs: Member_Management_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未关联`)
};

/**
* | output |
* | --- |
* | "Not linked" |
*
* @param {Member_Management_UnlinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlinked = /** @type {((inputs?: Member_Management_UnlinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_UnlinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_unlinked(inputs)
	return zh_member_management_unlinked(inputs)
});