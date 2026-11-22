/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Trend_Active_DescInputs */

const en_ul_trend_active_desc = /** @type {(inputs: Ul_Trend_Active_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated from active_score`)
};

const zh_ul_trend_active_desc = /** @type {(inputs: Ul_Trend_Active_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基于 active_score 数组生成`)
};

/**
* | output |
* | --- |
* | "Generated from active_score" |
*
* @param {Ul_Trend_Active_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_trend_active_desc = /** @type {((inputs?: Ul_Trend_Active_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Trend_Active_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_trend_active_desc(inputs)
	return zh_ul_trend_active_desc(inputs)
});