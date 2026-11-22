/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Platform_Account_ConnectInputs */

const en_profile_platform_account_connect = /** @type {(inputs: Profile_Platform_Account_ConnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect`)
};

const zh_profile_platform_account_connect = /** @type {(inputs: Profile_Platform_Account_ConnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关联`)
};

/**
* | output |
* | --- |
* | "Connect" |
*
* @param {Profile_Platform_Account_ConnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_account_connect = /** @type {((inputs?: Profile_Platform_Account_ConnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Account_ConnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_platform_account_connect(inputs)
	return zh_profile_platform_account_connect(inputs)
});