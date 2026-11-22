/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Oauth_Link_HintInputs */

const en_member_management_oauth_link_hint = /** @type {(inputs: Member_Management_Oauth_Link_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Click to go to the ${i?.platform} authorization page. The account link will complete automatically after authorization succeeds.`)
};

const zh_member_management_oauth_link_hint = /** @type {(inputs: Member_Management_Oauth_Link_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`点击后将跳转到 ${i?.platform} 登录授权页，授权成功后自动完成账号关联。`)
};

/**
* | output |
* | --- |
* | "Click to go to the {platform} authorization page. The account link will complete automatically after authorization succeeds." |
*
* @param {Member_Management_Oauth_Link_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_oauth_link_hint = /** @type {((inputs: Member_Management_Oauth_Link_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Oauth_Link_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_oauth_link_hint(inputs)
	return zh_member_management_oauth_link_hint(inputs)
});