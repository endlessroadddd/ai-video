/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Avatar_Must_Be_ImageInputs */

const en_profile_avatar_must_be_image = /** @type {(inputs: Profile_Avatar_Must_Be_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avatar file must be an image.`)
};

const zh_profile_avatar_must_be_image = /** @type {(inputs: Profile_Avatar_Must_Be_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`头像文件必须是图片格式。`)
};

/**
* | output |
* | --- |
* | "Avatar file must be an image." |
*
* @param {Profile_Avatar_Must_Be_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_avatar_must_be_image = /** @type {((inputs?: Profile_Avatar_Must_Be_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Avatar_Must_Be_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_avatar_must_be_image(inputs)
	return zh_profile_avatar_must_be_image(inputs)
});