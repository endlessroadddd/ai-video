/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Callback_Invalid_LinkInputs */

const en_auth_callback_invalid_link = /** @type {(inputs: Auth_Callback_Invalid_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email link is invalid or has expired`)
};

const zh_auth_callback_invalid_link = /** @type {(inputs: Auth_Callback_Invalid_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮件链接无效或已过期`)
};

/**
* | output |
* | --- |
* | "Email link is invalid or has expired" |
*
* @param {Auth_Callback_Invalid_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_invalid_link = /** @type {((inputs?: Auth_Callback_Invalid_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_Invalid_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_callback_invalid_link(inputs)
	return zh_auth_callback_invalid_link(inputs)
});