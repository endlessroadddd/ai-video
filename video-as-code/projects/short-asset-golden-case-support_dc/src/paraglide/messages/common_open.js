/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_OpenInputs */

const en_common_open = /** @type {(inputs: Common_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open`)
};

const zh_common_open = /** @type {(inputs: Common_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开`)
};

/**
* | output |
* | --- |
* | "Open" |
*
* @param {Common_OpenInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_open = /** @type {((inputs?: Common_OpenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_OpenInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_open(inputs)
	return zh_common_open(inputs)
});