/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Remove_Current_UserInputs */

const en_member_management_remove_current_user = /** @type {(inputs: Member_Management_Remove_Current_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current signed-in account cannot be removed`)
};

const zh_member_management_remove_current_user = /** @type {(inputs: Member_Management_Remove_Current_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前登录账号不可删除`)
};

/**
* | output |
* | --- |
* | "The current signed-in account cannot be removed" |
*
* @param {Member_Management_Remove_Current_UserInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_remove_current_user = /** @type {((inputs?: Member_Management_Remove_Current_UserInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Remove_Current_UserInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_remove_current_user(inputs)
	return zh_member_management_remove_current_user(inputs)
});