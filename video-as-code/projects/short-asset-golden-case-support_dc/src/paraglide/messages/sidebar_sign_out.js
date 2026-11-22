/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Sign_OutInputs */

const en_sidebar_sign_out = /** @type {(inputs: Sidebar_Sign_OutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign Out`)
};

const zh_sidebar_sign_out = /** @type {(inputs: Sidebar_Sign_OutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`退出登录`)
};

/**
* | output |
* | --- |
* | "Sign Out" |
*
* @param {Sidebar_Sign_OutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_sign_out = /** @type {((inputs?: Sidebar_Sign_OutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Sign_OutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_sign_out(inputs)
	return zh_sidebar_sign_out(inputs)
});