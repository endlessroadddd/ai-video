/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_InviteInputs */

const en_member_management_admin_quota_full_invite = /** @type {(inputs: Member_Management_Admin_Quota_Full_InviteInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin quota is full (${i?.count}/${i?.limit}). Please change the plan or invite as Member instead.`)
};

const zh_member_management_admin_quota_full_invite = /** @type {(inputs: Member_Management_Admin_Quota_Full_InviteInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin 配额已满（${i?.count}/${i?.limit}），请调整套餐或改邀 Member。`)
};

/**
* | output |
* | --- |
* | "Admin quota is full ({count}/{limit}). Please change the plan or invite as Member instead." |
*
* @param {Member_Management_Admin_Quota_Full_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_quota_full_invite = /** @type {((inputs: Member_Management_Admin_Quota_Full_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Quota_Full_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_admin_quota_full_invite(inputs)
	return zh_member_management_admin_quota_full_invite(inputs)
});