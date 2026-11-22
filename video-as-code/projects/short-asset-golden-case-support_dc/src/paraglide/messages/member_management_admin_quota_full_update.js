/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_UpdateInputs */

const en_member_management_admin_quota_full_update = /** @type {(inputs: Member_Management_Admin_Quota_Full_UpdateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin quota is full (${i?.count}/${i?.limit}). Please change the plan or switch to Member.`)
};

const zh_member_management_admin_quota_full_update = /** @type {(inputs: Member_Management_Admin_Quota_Full_UpdateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin 配额已满（${i?.count}/${i?.limit}），请调整套餐或改为 Member。`)
};

/**
* | output |
* | --- |
* | "Admin quota is full ({count}/{limit}). Please change the plan or switch to Member." |
*
* @param {Member_Management_Admin_Quota_Full_UpdateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_quota_full_update = /** @type {((inputs: Member_Management_Admin_Quota_Full_UpdateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Quota_Full_UpdateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_admin_quota_full_update(inputs)
	return zh_member_management_admin_quota_full_update(inputs)
});