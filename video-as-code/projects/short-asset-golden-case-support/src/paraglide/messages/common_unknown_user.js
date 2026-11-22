/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_Unknown_UserInputs */

const en_common_unknown_user = /** @type {(inputs: Common_Unknown_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown user`)
};

const zh_common_unknown_user = /** @type {(inputs: Common_Unknown_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知用户`)
};

/**
* | output |
* | --- |
* | "Unknown user" |
*
* @param {Common_Unknown_UserInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_unknown_user = /** @type {((inputs?: Common_Unknown_UserInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Unknown_UserInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_unknown_user(inputs)
	return zh_common_unknown_user(inputs)
});