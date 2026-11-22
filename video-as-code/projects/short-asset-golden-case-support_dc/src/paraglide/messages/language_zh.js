/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Language_ZhInputs */

const en_language_zh = /** @type {(inputs: Language_ZhInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`中文`)
};

const zh_language_zh = /** @type {(inputs: Language_ZhInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`中文`)
};

/**
* | output |
* | --- |
* | "中文" |
*
* @param {Language_ZhInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_zh = /** @type {((inputs?: Language_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_ZhInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_language_zh(inputs)
	return zh_language_zh(inputs)
});