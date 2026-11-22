/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Not_Logged_InInputs */

const en_sidebar_not_logged_in = /** @type {(inputs: Sidebar_Not_Logged_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not signed in`)
};

const zh_sidebar_not_logged_in = /** @type {(inputs: Sidebar_Not_Logged_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未登录`)
};

/**
* | output |
* | --- |
* | "Not signed in" |
*
* @param {Sidebar_Not_Logged_InInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_not_logged_in = /** @type {((inputs?: Sidebar_Not_Logged_InInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Not_Logged_InInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_not_logged_in(inputs)
	return zh_sidebar_not_logged_in(inputs)
});