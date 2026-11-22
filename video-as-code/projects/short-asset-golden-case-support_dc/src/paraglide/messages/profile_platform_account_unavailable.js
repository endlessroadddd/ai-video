/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Platform_Account_UnavailableInputs */

const en_profile_platform_account_unavailable = /** @type {(inputs: Profile_Platform_Account_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable`)
};

const zh_profile_platform_account_unavailable = /** @type {(inputs: Profile_Platform_Account_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不可用`)
};

/**
* | output |
* | --- |
* | "Unavailable" |
*
* @param {Profile_Platform_Account_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_account_unavailable = /** @type {((inputs?: Profile_Platform_Account_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Account_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_platform_account_unavailable(inputs)
	return zh_profile_platform_account_unavailable(inputs)
});