/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ size: NonNullable<unknown> }} Profile_Avatar_Size_LimitInputs */

const en_profile_avatar_size_limit = /** @type {(inputs: Profile_Avatar_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Avatar file must be smaller than ${i?.size}.`)
};

const zh_profile_avatar_size_limit = /** @type {(inputs: Profile_Avatar_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`头像文件大小不能超过 ${i?.size}。`)
};

/**
* | output |
* | --- |
* | "Avatar file must be smaller than {size}." |
*
* @param {Profile_Avatar_Size_LimitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_avatar_size_limit = /** @type {((inputs: Profile_Avatar_Size_LimitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Avatar_Size_LimitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_avatar_size_limit(inputs)
	return zh_profile_avatar_size_limit(inputs)
});