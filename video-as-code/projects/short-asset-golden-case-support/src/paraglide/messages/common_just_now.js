/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_Just_NowInputs */

const en_common_just_now = /** @type {(inputs: Common_Just_NowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Just now`)
};

const zh_common_just_now = /** @type {(inputs: Common_Just_NowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刚刚`)
};

/**
* | output |
* | --- |
* | "Just now" |
*
* @param {Common_Just_NowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_just_now = /** @type {((inputs?: Common_Just_NowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Just_NowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_just_now(inputs)
	return zh_common_just_now(inputs)
});