/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_First_Interaction_HelperInputs */

const en_ul_detail_first_interaction_helper = /** @type {(inputs: Ul_Detail_First_Interaction_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`First interaction date recorded by the system`)
};

const zh_ul_detail_first_interaction_helper = /** @type {(inputs: Ul_Detail_First_Interaction_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户第一次被系统记录到的互动日期`)
};

/**
* | output |
* | --- |
* | "First interaction date recorded by the system" |
*
* @param {Ul_Detail_First_Interaction_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_first_interaction_helper = /** @type {((inputs?: Ul_Detail_First_Interaction_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_First_Interaction_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_first_interaction_helper(inputs)
	return zh_ul_detail_first_interaction_helper(inputs)
});