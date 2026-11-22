/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Platform_Accounts_TitleInputs */

const en_profile_platform_accounts_title = /** @type {(inputs: Profile_Platform_Accounts_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platform accounts`)
};

const zh_profile_platform_accounts_title = /** @type {(inputs: Profile_Platform_Accounts_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台账号`)
};

/**
* | output |
* | --- |
* | "Platform accounts" |
*
* @param {Profile_Platform_Accounts_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_accounts_title = /** @type {((inputs?: Profile_Platform_Accounts_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Accounts_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_platform_accounts_title(inputs)
	return zh_profile_platform_accounts_title(inputs)
});