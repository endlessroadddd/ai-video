/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_Last_Active_HelperInputs */

const en_ul_detail_last_active_helper = /** @type {(inputs: Ul_Detail_Last_Active_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last message date`)
};

const zh_ul_detail_last_active_helper = /** @type {(inputs: Ul_Detail_Last_Active_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最后一次产生消息的日期`)
};

/**
* | output |
* | --- |
* | "Last message date" |
*
* @param {Ul_Detail_Last_Active_HelperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_last_active_helper = /** @type {((inputs?: Ul_Detail_Last_Active_HelperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_Last_Active_HelperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_last_active_helper(inputs)
	return zh_ul_detail_last_active_helper(inputs)
});