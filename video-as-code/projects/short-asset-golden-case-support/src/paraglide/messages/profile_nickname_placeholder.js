/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Nickname_PlaceholderInputs */

const en_profile_nickname_placeholder = /** @type {(inputs: Profile_Nickname_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`your nickname`)
};

const zh_profile_nickname_placeholder = /** @type {(inputs: Profile_Nickname_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的昵称`)
};

/**
* | output |
* | --- |
* | "your nickname" |
*
* @param {Profile_Nickname_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_nickname_placeholder = /** @type {((inputs?: Profile_Nickname_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Nickname_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_nickname_placeholder(inputs)
	return zh_profile_nickname_placeholder(inputs)
});