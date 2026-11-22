/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Owner_Only_ActionInputs */

const en_member_management_owner_only_action = /** @type {(inputs: Member_Management_Owner_Only_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can operate`)
};

const zh_member_management_owner_only_action = /** @type {(inputs: Member_Management_Owner_Only_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可操作`)
};

/**
* | output |
* | --- |
* | "Only Owner/Admin can operate" |
*
* @param {Member_Management_Owner_Only_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_owner_only_action = /** @type {((inputs?: Member_Management_Owner_Only_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Owner_Only_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_owner_only_action(inputs)
	return zh_member_management_owner_only_action(inputs)
});