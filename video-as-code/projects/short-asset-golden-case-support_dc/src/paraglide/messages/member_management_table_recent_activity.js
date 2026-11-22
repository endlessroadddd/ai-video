/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Table_Recent_ActivityInputs */

const en_member_management_table_recent_activity = /** @type {(inputs: Member_Management_Table_Recent_ActivityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recent activity`)
};

const zh_member_management_table_recent_activity = /** @type {(inputs: Member_Management_Table_Recent_ActivityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近活跃`)
};

/**
* | output |
* | --- |
* | "Recent activity" |
*
* @param {Member_Management_Table_Recent_ActivityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_table_recent_activity = /** @type {((inputs?: Member_Management_Table_Recent_ActivityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Table_Recent_ActivityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_table_recent_activity(inputs)
	return zh_member_management_table_recent_activity(inputs)
});