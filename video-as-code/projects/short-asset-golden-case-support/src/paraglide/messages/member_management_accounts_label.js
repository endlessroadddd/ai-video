/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ accounts: NonNullable<unknown> }} Member_Management_Accounts_LabelInputs */

const en_member_management_accounts_label = /** @type {(inputs: Member_Management_Accounts_LabelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Accounts: ${i?.accounts}`)
};

const zh_member_management_accounts_label = /** @type {(inputs: Member_Management_Accounts_LabelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`账号：${i?.accounts}`)
};

/**
* | output |
* | --- |
* | "Accounts: {accounts}" |
*
* @param {Member_Management_Accounts_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_accounts_label = /** @type {((inputs: Member_Management_Accounts_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Accounts_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_accounts_label(inputs)
	return zh_member_management_accounts_label(inputs)
});