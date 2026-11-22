/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_Lucius_Ai_NameInputs */

const en_common_lucius_ai_name = /** @type {(inputs: Common_Lucius_Ai_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

const zh_common_lucius_ai_name = /** @type {(inputs: Common_Lucius_Ai_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

/**
* | output |
* | --- |
* | "Lucius AI" |
*
* @param {Common_Lucius_Ai_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_lucius_ai_name = /** @type {((inputs?: Common_Lucius_Ai_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Lucius_Ai_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_lucius_ai_name(inputs)
	return zh_common_lucius_ai_name(inputs)
});