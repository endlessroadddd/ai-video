/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_Loading_AuthInputs */

const en_header_loading_auth = /** @type {(inputs: Header_Loading_AuthInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading auth`)
};

const zh_header_loading_auth = /** @type {(inputs: Header_Loading_AuthInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载登录状态`)
};

/**
* | output |
* | --- |
* | "Loading auth" |
*
* @param {Header_Loading_AuthInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_loading_auth = /** @type {((inputs?: Header_Loading_AuthInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Loading_AuthInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_loading_auth(inputs)
	return zh_header_loading_auth(inputs)
});