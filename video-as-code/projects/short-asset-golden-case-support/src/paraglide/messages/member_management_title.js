/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_TitleInputs */

const en_member_management_title = /** @type {(inputs: Member_Management_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member Management`)
};

const zh_member_management_title = /** @type {(inputs: Member_Management_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人员管理`)
};

/**
* | output |
* | --- |
* | "Member Management" |
*
* @param {Member_Management_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_title = /** @type {((inputs?: Member_Management_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_title(inputs)
	return zh_member_management_title(inputs)
});