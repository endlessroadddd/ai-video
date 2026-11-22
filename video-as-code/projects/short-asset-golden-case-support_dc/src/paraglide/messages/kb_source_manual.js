/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Source_ManualInputs */

const en_kb_source_manual = /** @type {(inputs: Kb_Source_ManualInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual`)
};

const zh_kb_source_manual = /** @type {(inputs: Kb_Source_ManualInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动添加`)
};

/**
* | output |
* | --- |
* | "Manual" |
*
* @param {Kb_Source_ManualInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_source_manual = /** @type {((inputs?: Kb_Source_ManualInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Source_ManualInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_source_manual(inputs)
	return zh_kb_source_manual(inputs)
});