/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Init_FailedInputs */

const en_profile_init_failed = /** @type {(inputs: Profile_Init_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to initialize profile. Please try again later.`)
};

const zh_profile_init_failed = /** @type {(inputs: Profile_Init_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化资料失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to initialize profile. Please try again later." |
*
* @param {Profile_Init_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_init_failed = /** @type {((inputs?: Profile_Init_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Init_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_init_failed(inputs)
	return zh_profile_init_failed(inputs)
});