/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Email_RequiredInputs */

const en_auth_email_required = /** @type {(inputs: Auth_Email_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter your email address.`)
};

const zh_auth_email_required = /** @type {(inputs: Auth_Email_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入邮箱地址。`)
};

/**
* | output |
* | --- |
* | "Please enter your email address." |
*
* @param {Auth_Email_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_required = /** @type {((inputs?: Auth_Email_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_email_required(inputs)
	return zh_auth_email_required(inputs)
});