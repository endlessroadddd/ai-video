/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_TitleInputs */

const en_kb_title = /** @type {(inputs: Kb_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wiki`)
};

const zh_kb_title = /** @type {(inputs: Kb_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识库`)
};

/**
* | output |
* | --- |
* | "Wiki" |
*
* @param {Kb_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_title = /** @type {((inputs?: Kb_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_title(inputs)
	return zh_kb_title(inputs)
});