/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Email_LabelInputs */

const en_auth_email_label = /** @type {(inputs: Auth_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email address`)
};

const zh_auth_email_label = /** @type {(inputs: Auth_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱地址`)
};

/**
* | output |
* | --- |
* | "Email address" |
*
* @param {Auth_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_label = /** @type {((inputs?: Auth_Email_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_email_label(inputs)
	return zh_auth_email_label(inputs)
});