/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Pick_Company_FirstInputs */

const en_kb_pick_company_first = /** @type {(inputs: Kb_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company from the top-left first.`)
};

const zh_kb_pick_company_first = /** @type {(inputs: Kb_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先在左上角选择公司后再查看知识库。`)
};

/**
* | output |
* | --- |
* | "Please select a company from the top-left first." |
*
* @param {Kb_Pick_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_pick_company_first = /** @type {((inputs?: Kb_Pick_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Pick_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_pick_company_first(inputs)
	return zh_kb_pick_company_first(inputs)
});