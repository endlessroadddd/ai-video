/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Unknown_TitleInputs */

const en_kb_unknown_title = /** @type {(inputs: Kb_Unknown_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled knowledge`)
};

const zh_kb_unknown_title = /** @type {(inputs: Kb_Unknown_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名知识`)
};

/**
* | output |
* | --- |
* | "Untitled knowledge" |
*
* @param {Kb_Unknown_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_unknown_title = /** @type {((inputs?: Kb_Unknown_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Unknown_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_unknown_title(inputs)
	return zh_kb_unknown_title(inputs)
});