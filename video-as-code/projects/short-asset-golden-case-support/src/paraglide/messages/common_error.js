/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_ErrorInputs */

const en_common_error = /** @type {(inputs: Common_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error`)
};

const zh_common_error = /** @type {(inputs: Common_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`错误`)
};

/**
* | output |
* | --- |
* | "Error" |
*
* @param {Common_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_error = /** @type {((inputs?: Common_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_error(inputs)
	return zh_common_error(inputs)
});