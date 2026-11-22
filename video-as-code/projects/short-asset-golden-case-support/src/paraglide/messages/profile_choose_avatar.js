/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Choose_AvatarInputs */

const en_profile_choose_avatar = /** @type {(inputs: Profile_Choose_AvatarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose avatar`)
};

const zh_profile_choose_avatar = /** @type {(inputs: Profile_Choose_AvatarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择头像`)
};

/**
* | output |
* | --- |
* | "Choose avatar" |
*
* @param {Profile_Choose_AvatarInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_choose_avatar = /** @type {((inputs?: Profile_Choose_AvatarInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Choose_AvatarInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_choose_avatar(inputs)
	return zh_profile_choose_avatar(inputs)
});