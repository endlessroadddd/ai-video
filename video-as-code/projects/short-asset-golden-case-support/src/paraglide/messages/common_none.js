/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_NoneInputs */

const en_common_none = /** @type {(inputs: Common_NoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None`)
};

const zh_common_none = /** @type {(inputs: Common_NoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无`)
};

/**
* | output |
* | --- |
* | "None" |
*
* @param {Common_NoneInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_none = /** @type {((inputs?: Common_NoneInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NoneInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_none(inputs)
	return zh_common_none(inputs)
});