/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Linked_PlatformsInputs */

const en_member_management_linked_platforms = /** @type {(inputs: Member_Management_Linked_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Linked platforms:`)
};

const zh_member_management_linked_platforms = /** @type {(inputs: Member_Management_Linked_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已关联平台：`)
};

/**
* | output |
* | --- |
* | "Linked platforms:" |
*
* @param {Member_Management_Linked_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_linked_platforms = /** @type {((inputs?: Member_Management_Linked_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Linked_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_linked_platforms(inputs)
	return zh_member_management_linked_platforms(inputs)
});