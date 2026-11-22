/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Tab_AllInputs */

const en_kb_tab_all = /** @type {(inputs: Kb_Tab_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Knowledge`)
};

const zh_kb_tab_all = /** @type {(inputs: Kb_Tab_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有知识`)
};

/**
* | output |
* | --- |
* | "All Knowledge" |
*
* @param {Kb_Tab_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_tab_all = /** @type {((inputs?: Kb_Tab_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Tab_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_tab_all(inputs)
	return zh_kb_tab_all(inputs)
});