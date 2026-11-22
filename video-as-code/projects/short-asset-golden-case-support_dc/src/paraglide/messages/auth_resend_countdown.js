/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ seconds: NonNullable<unknown> }} Auth_Resend_CountdownInputs */

const en_auth_resend_countdown = /** @type {(inputs: Auth_Resend_CountdownInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Resend (${i?.seconds}s)`)
};

const zh_auth_resend_countdown = /** @type {(inputs: Auth_Resend_CountdownInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`重新发送（${i?.seconds}s）`)
};

/**
* | output |
* | --- |
* | "Resend ({seconds}s)" |
*
* @param {Auth_Resend_CountdownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_resend_countdown = /** @type {((inputs: Auth_Resend_CountdownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Resend_CountdownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_resend_countdown(inputs)
	return zh_auth_resend_countdown(inputs)
});