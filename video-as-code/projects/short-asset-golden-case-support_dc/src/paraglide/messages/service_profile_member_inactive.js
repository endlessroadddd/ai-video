/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Profile_Member_InactiveInputs */

const en_service_profile_member_inactive = /** @type {(inputs: Service_Profile_Member_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You are not an active member of the current company, or the invitation has not taken effect yet. Please sign in again and retry.`)
};

const zh_service_profile_member_inactive = /** @type {(inputs: Service_Profile_Member_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你不是当前公司的有效成员，或邀请尚未完成生效。请重新登录后重试。`)
};

/**
* | output |
* | --- |
* | "You are not an active member of the current company, or the invitation has not taken effect yet. Please sign in again and retry." |
*
* @param {Service_Profile_Member_InactiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_profile_member_inactive = /** @type {((inputs?: Service_Profile_Member_InactiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Profile_Member_InactiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_profile_member_inactive(inputs)
	return zh_service_profile_member_inactive(inputs)
});