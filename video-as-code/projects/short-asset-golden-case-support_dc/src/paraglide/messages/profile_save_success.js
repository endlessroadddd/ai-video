/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Save_SuccessInputs */

const en_profile_save_success = /** @type {(inputs: Profile_Save_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile saved successfully.`)
};

const zh_profile_save_success = /** @type {(inputs: Profile_Save_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`资料保存成功。`)
};

/**
* | output |
* | --- |
* | "Profile saved successfully." |
*
* @param {Profile_Save_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_save_success = /** @type {((inputs?: Profile_Save_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Save_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_save_success(inputs)
	return zh_profile_save_success(inputs)
});