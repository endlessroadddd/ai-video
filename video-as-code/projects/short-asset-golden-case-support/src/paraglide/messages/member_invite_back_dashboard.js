/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Back_DashboardInputs */

const en_member_invite_back_dashboard = /** @type {(inputs: Member_Invite_Back_DashboardInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to dashboard`)
};

const zh_member_invite_back_dashboard = /** @type {(inputs: Member_Invite_Back_DashboardInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回工作台`)
};

/**
* | output |
* | --- |
* | "Back to dashboard" |
*
* @param {Member_Invite_Back_DashboardInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_back_dashboard = /** @type {((inputs?: Member_Invite_Back_DashboardInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Back_DashboardInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_back_dashboard(inputs)
	return zh_member_invite_back_dashboard(inputs)
});