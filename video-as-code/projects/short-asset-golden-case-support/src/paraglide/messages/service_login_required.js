/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Login_RequiredInputs */

const en_service_login_required = /** @type {(inputs: Service_Login_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You are not signed in. Please sign in again and retry.`)
};

const zh_service_login_required = /** @type {(inputs: Service_Login_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前用户未登录，请重新登录后再操作。`)
};

/**
* | output |
* | --- |
* | "You are not signed in. Please sign in again and retry." |
*
* @param {Service_Login_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_login_required = /** @type {((inputs?: Service_Login_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Login_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_login_required(inputs)
	return zh_service_login_required(inputs)
});