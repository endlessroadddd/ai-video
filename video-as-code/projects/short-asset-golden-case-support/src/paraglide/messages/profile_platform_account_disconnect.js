/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Profile_Platform_Account_DisconnectInputs */

const en_profile_platform_account_disconnect = /** @type {(inputs: Profile_Platform_Account_DisconnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disconnect`)
};

const zh_profile_platform_account_disconnect = /** @type {(inputs: Profile_Platform_Account_DisconnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`解绑`)
};

/**
* | output |
* | --- |
* | "Disconnect" |
*
* @param {Profile_Platform_Account_DisconnectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const profile_platform_account_disconnect = /** @type {((inputs?: Profile_Platform_Account_DisconnectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Platform_Account_DisconnectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_profile_platform_account_disconnect(inputs)
	return zh_profile_platform_account_disconnect(inputs)
});