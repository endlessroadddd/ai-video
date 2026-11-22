/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Avatar_Preview_AltInputs */

const en_profile_avatar_preview_alt = /** @type {(inputs: Profile_Avatar_Preview_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avatar preview`)
};

const zh_profile_avatar_preview_alt = /** @type {(inputs: Profile_Avatar_Preview_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`头像预览`)
};

/**
* | output |
* | --- |
* | "Avatar preview" |
*
* @param {Profile_Avatar_Preview_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_avatar_preview_alt = /** @type {((inputs?: Profile_Avatar_Preview_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Avatar_Preview_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_avatar_preview_alt(inputs)
	return zh_profile_avatar_preview_alt(inputs)
});