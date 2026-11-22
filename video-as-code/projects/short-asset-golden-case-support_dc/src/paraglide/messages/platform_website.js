/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Platform_WebsiteInputs */

const en_platform_website = /** @type {(inputs: Platform_WebsiteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Website`)
};

const zh_platform_website = /** @type {(inputs: Platform_WebsiteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`网站`)
};

/**
* | output |
* | --- |
* | "Website" |
*
* @param {Platform_WebsiteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_website = /** @type {((inputs?: Platform_WebsiteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_WebsiteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_platform_website(inputs)
	return zh_platform_website(inputs)
});