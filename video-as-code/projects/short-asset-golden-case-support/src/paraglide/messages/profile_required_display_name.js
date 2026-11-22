/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Required_Display_NameInputs */

const en_profile_required_display_name = /** @type {(inputs: Profile_Required_Display_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a nickname.`)
};

const zh_profile_required_display_name = /** @type {(inputs: Profile_Required_Display_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入昵称。`)
};

/**
* | output |
* | --- |
* | "Please enter a nickname." |
*
* @param {Profile_Required_Display_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_required_display_name = /** @type {((inputs?: Profile_Required_Display_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Required_Display_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_required_display_name(inputs)
	return zh_profile_required_display_name(inputs)
});