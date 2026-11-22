/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Email_PlaceholderInputs */

const en_auth_email_placeholder = /** @type {(inputs: Auth_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter your email address`)
};

const zh_auth_email_placeholder = /** @type {(inputs: Auth_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入您的邮箱地址`)
};

/**
* | output |
* | --- |
* | "Enter your email address" |
*
* @param {Auth_Email_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_placeholder = /** @type {((inputs?: Auth_Email_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_email_placeholder(inputs)
	return zh_auth_email_placeholder(inputs)
});