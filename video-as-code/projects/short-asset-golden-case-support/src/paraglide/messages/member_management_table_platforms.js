/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Table_PlatformsInputs */

const en_member_management_table_platforms = /** @type {(inputs: Member_Management_Table_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platforms`)
};

const zh_member_management_table_platforms = /** @type {(inputs: Member_Management_Table_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台`)
};

/**
* | output |
* | --- |
* | "Platforms" |
*
* @param {Member_Management_Table_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_table_platforms = /** @type {((inputs?: Member_Management_Table_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Table_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_table_platforms(inputs)
	return zh_member_management_table_platforms(inputs)
});