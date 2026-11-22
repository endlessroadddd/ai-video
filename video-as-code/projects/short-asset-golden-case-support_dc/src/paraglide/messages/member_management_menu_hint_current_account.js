/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Menu_Hint_Current_AccountInputs */

const en_member_management_menu_hint_current_account = /** @type {(inputs: Member_Management_Menu_Hint_Current_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current account`)
};

const zh_member_management_menu_hint_current_account = /** @type {(inputs: Member_Management_Menu_Hint_Current_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号`)
};

/**
* | output |
* | --- |
* | "Current account" |
*
* @param {Member_Management_Menu_Hint_Current_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_menu_hint_current_account = /** @type {((inputs?: Member_Management_Menu_Hint_Current_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Menu_Hint_Current_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_menu_hint_current_account(inputs)
	return zh_member_management_menu_hint_current_account(inputs)
});