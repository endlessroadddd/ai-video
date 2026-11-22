/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Member_Management_Avatar_AltInputs */

const en_member_management_avatar_alt = /** @type {(inputs: Member_Management_Avatar_AltInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} avatar`)
};

const zh_member_management_avatar_alt = /** @type {(inputs: Member_Management_Avatar_AltInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 头像`)
};

/**
* | output |
* | --- |
* | "{name} avatar" |
*
* @param {Member_Management_Avatar_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_avatar_alt = /** @type {((inputs: Member_Management_Avatar_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Avatar_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_avatar_alt(inputs)
	return zh_member_management_avatar_alt(inputs)
});