/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_User_Avatar_AltInputs */

const en_header_user_avatar_alt = /** @type {(inputs: Header_User_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User avatar`)
};

const zh_header_user_avatar_alt = /** @type {(inputs: Header_User_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户头像`)
};

/**
* | output |
* | --- |
* | "User avatar" |
*
* @param {Header_User_Avatar_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_user_avatar_alt = /** @type {((inputs?: Header_User_Avatar_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_User_Avatar_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_user_avatar_alt(inputs)
	return zh_header_user_avatar_alt(inputs)
});