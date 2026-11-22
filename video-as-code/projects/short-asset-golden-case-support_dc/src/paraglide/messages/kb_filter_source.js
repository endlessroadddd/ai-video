/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Filter_SourceInputs */

const en_kb_filter_source = /** @type {(inputs: Kb_Filter_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Source`)
};

const zh_kb_filter_source = /** @type {(inputs: Kb_Filter_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来源`)
};

/**
* | output |
* | --- |
* | "Source" |
*
* @param {Kb_Filter_SourceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_filter_source = /** @type {((inputs?: Kb_Filter_SourceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Filter_SourceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_filter_source(inputs)
	return zh_kb_filter_source(inputs)
});