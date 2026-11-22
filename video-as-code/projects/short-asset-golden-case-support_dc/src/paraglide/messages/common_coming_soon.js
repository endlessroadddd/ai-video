/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_Coming_SoonInputs */

const en_common_coming_soon = /** @type {(inputs: Common_Coming_SoonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Coming soon`)
};

const zh_common_coming_soon = /** @type {(inputs: Common_Coming_SoonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`即将上线`)
};

/**
* | output |
* | --- |
* | "Coming soon" |
*
* @param {Common_Coming_SoonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_coming_soon = /** @type {((inputs?: Common_Coming_SoonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Coming_SoonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_coming_soon(inputs)
	return zh_common_coming_soon(inputs)
});