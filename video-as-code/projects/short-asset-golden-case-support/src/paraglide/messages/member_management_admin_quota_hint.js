/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Admin_Quota_HintInputs */

const en_member_management_admin_quota_hint = /** @type {(inputs: Member_Management_Admin_Quota_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin quota is full. Free a slot first before adjusting.`)
};

const zh_member_management_admin_quota_hint = /** @type {(inputs: Member_Management_Admin_Quota_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 配额已满，请先释放名额后再调整。`)
};

/**
* | output |
* | --- |
* | "Admin quota is full. Free a slot first before adjusting." |
*
* @param {Member_Management_Admin_Quota_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_quota_hint = /** @type {((inputs?: Member_Management_Admin_Quota_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Quota_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_admin_quota_hint(inputs)
	return zh_member_management_admin_quota_hint(inputs)
});