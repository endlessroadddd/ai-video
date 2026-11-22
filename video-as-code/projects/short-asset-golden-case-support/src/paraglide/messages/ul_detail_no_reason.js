/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_No_ReasonInputs */

const en_ul_detail_no_reason = /** @type {(inputs: Ul_Detail_No_ReasonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No reason provided`)
};

const zh_ul_detail_no_reason = /** @type {(inputs: Ul_Detail_No_ReasonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无命中原因`)
};

/**
* | output |
* | --- |
* | "No reason provided" |
*
* @param {Ul_Detail_No_ReasonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_no_reason = /** @type {((inputs?: Ul_Detail_No_ReasonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_No_ReasonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_no_reason(inputs)
	return zh_ul_detail_no_reason(inputs)
});