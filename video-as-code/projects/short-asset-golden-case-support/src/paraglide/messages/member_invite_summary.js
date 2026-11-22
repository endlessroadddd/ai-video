/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ role: NonNullable<unknown> }} Member_Invite_SummaryInputs */

const en_member_invite_summary = /** @type {(inputs: Member_Invite_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`This link will add whoever signs in as ${i?.role} to the current Lucius workspace.`)
};

const zh_member_invite_summary = /** @type {(inputs: Member_Invite_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`这个邀请链接会把登录后的用户以 ${i?.role} 身份加入当前 Lucius 工作区。`)
};

/**
* | output |
* | --- |
* | "This link will add whoever signs in as {role} to the current Lucius workspace." |
*
* @param {Member_Invite_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_summary = /** @type {((inputs: Member_Invite_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_summary(inputs)
	return zh_member_invite_summary(inputs)
});