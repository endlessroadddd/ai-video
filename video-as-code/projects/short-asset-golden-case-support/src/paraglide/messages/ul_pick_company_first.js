/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Pick_Company_FirstInputs */

const en_ul_pick_company_first = /** @type {(inputs: Ul_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company to view the user list.`)
};

const zh_ul_pick_company_first = /** @type {(inputs: Ul_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司后再查看用户列表。`)
};

/**
* | output |
* | --- |
* | "Please select a company to view the user list." |
*
* @param {Ul_Pick_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_pick_company_first = /** @type {((inputs?: Ul_Pick_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Pick_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_pick_company_first(inputs)
	return zh_ul_pick_company_first(inputs)
});