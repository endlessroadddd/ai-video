/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Expiry_LabelInputs */

const en_member_invite_expiry_label = /** @type {(inputs: Member_Invite_Expiry_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expires at`)
};

const zh_member_invite_expiry_label = /** @type {(inputs: Member_Invite_Expiry_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失效时间`)
};

/**
* | output |
* | --- |
* | "Expires at" |
*
* @param {Member_Invite_Expiry_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_expiry_label = /** @type {((inputs?: Member_Invite_Expiry_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Expiry_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_expiry_label(inputs)
	return zh_member_invite_expiry_label(inputs)
});