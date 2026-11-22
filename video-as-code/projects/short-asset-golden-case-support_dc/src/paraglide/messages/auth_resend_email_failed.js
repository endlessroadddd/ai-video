/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ message: NonNullable<unknown> }} Auth_Resend_Email_FailedInputs */

const en_auth_resend_email_failed = /** @type {(inputs: Auth_Resend_Email_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to resend email: ${i?.message}`)
};

const zh_auth_resend_email_failed = /** @type {(inputs: Auth_Resend_Email_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`重发邮件失败：${i?.message}`)
};

/**
* | output |
* | --- |
* | "Failed to resend email: {message}" |
*
* @param {Auth_Resend_Email_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_resend_email_failed = /** @type {((inputs: Auth_Resend_Email_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Resend_Email_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_resend_email_failed(inputs)
	return zh_auth_resend_email_failed(inputs)
});