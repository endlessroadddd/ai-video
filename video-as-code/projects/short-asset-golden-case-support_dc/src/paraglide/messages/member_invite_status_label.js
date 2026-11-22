/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Status_LabelInputs */

const en_member_invite_status_label = /** @type {(inputs: Member_Invite_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

const zh_member_invite_status_label = /** @type {(inputs: Member_Invite_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前状态`)
};

/**
* | output |
* | --- |
* | "Status" |
*
* @param {Member_Invite_Status_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_status_label = /** @type {((inputs?: Member_Invite_Status_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Status_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_status_label(inputs)
	return zh_member_invite_status_label(inputs)
});