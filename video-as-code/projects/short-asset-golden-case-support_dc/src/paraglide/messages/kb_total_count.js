/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Kb_Total_CountInputs */

const en_kb_total_count = /** @type {(inputs: Kb_Total_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Total ${i?.count}`)
};

const zh_kb_total_count = /** @type {(inputs: Kb_Total_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`共${i?.count}条`)
};

/**
* | output |
* | --- |
* | "Total {count}" |
*
* @param {Kb_Total_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_total_count = /** @type {((inputs: Kb_Total_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Total_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_total_count(inputs)
	return zh_kb_total_count(inputs)
});