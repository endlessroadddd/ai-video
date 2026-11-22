/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Display_Name_Length_ErrorInputs */

const en_profile_display_name_length_error = /** @type {(inputs: Profile_Display_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Nickname must be ${i?.min}-${i?.max} characters.`)
};

const zh_profile_display_name_length_error = /** @type {(inputs: Profile_Display_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`昵称需为 ${i?.min}-${i?.max} 个字符。`)
};

/**
* | output |
* | --- |
* | "Nickname must be {min}-{max} characters." |
*
* @param {Profile_Display_Name_Length_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_display_name_length_error = /** @type {((inputs: Profile_Display_Name_Length_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Display_Name_Length_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_display_name_length_error(inputs)
	return zh_profile_display_name_length_error(inputs)
});