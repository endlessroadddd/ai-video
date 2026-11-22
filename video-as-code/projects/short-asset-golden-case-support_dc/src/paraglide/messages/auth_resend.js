/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_ResendInputs */

const en_auth_resend = /** @type {(inputs: Auth_ResendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resend`)
};

const zh_auth_resend = /** @type {(inputs: Auth_ResendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新发送`)
};

/**
* | output |
* | --- |
* | "Resend" |
*
* @param {Auth_ResendInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_resend = /** @type {((inputs?: Auth_ResendInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_ResendInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_resend(inputs)
	return zh_auth_resend(inputs)
});