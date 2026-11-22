/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_Email_LoginInputs */

const en_header_email_login = /** @type {(inputs: Header_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email Login`)
};

const zh_header_email_login = /** @type {(inputs: Header_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱登录`)
};

/**
* | output |
* | --- |
* | "Email Login" |
*
* @param {Header_Email_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_email_login = /** @type {((inputs?: Header_Email_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Email_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_email_login(inputs)
	return zh_header_email_login(inputs)
});