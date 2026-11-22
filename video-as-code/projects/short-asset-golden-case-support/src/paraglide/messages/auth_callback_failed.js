/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ message: NonNullable<unknown> }} Auth_Callback_FailedInputs */

const en_auth_callback_failed = /** @type {(inputs: Auth_Callback_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Callback failed: ${i?.message}`)
};

const zh_auth_callback_failed = /** @type {(inputs: Auth_Callback_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`登录回调失败：${i?.message}`)
};

/**
* | output |
* | --- |
* | "Callback failed: {message}" |
*
* @param {Auth_Callback_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_failed = /** @type {((inputs: Auth_Callback_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_callback_failed(inputs)
	return zh_auth_callback_failed(inputs)
});