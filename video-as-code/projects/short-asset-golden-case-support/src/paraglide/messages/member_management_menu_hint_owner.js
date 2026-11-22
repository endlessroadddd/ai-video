/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Menu_Hint_OwnerInputs */

const en_member_management_menu_hint_owner = /** @type {(inputs: Member_Management_Menu_Hint_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

const zh_member_management_menu_hint_owner = /** @type {(inputs: Member_Management_Menu_Hint_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

/**
* | output |
* | --- |
* | "Owner" |
*
* @param {Member_Management_Menu_Hint_OwnerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_menu_hint_owner = /** @type {((inputs?: Member_Management_Menu_Hint_OwnerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Menu_Hint_OwnerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_menu_hint_owner(inputs)
	return zh_member_management_menu_hint_owner(inputs)
});