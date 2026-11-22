/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Actions_TitleInputs */

const en_member_management_actions_title = /** @type {(inputs: Member_Management_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member actions`)
};

const zh_member_management_actions_title = /** @type {(inputs: Member_Management_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成员操作`)
};

/**
* | output |
* | --- |
* | "Member actions" |
*
* @param {Member_Management_Actions_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_actions_title = /** @type {((inputs?: Member_Management_Actions_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Actions_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_actions_title(inputs)
	return zh_member_management_actions_title(inputs)
});