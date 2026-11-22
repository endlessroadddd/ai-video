/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Save_ErrorInputs */

const en_profile_save_error = /** @type {(inputs: Profile_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save profile. Please try again later.`)
};

const zh_profile_save_error = /** @type {(inputs: Profile_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`资料保存失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to save profile. Please try again later." |
*
* @param {Profile_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_save_error = /** @type {((inputs?: Profile_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_save_error(inputs)
	return zh_profile_save_error(inputs)
});