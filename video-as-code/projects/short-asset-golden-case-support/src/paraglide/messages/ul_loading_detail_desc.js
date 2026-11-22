/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Loading_Detail_DescInputs */

const en_ul_loading_detail_desc = /** @type {(inputs: Ul_Loading_Detail_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please wait, loading user profile and messages.`)
};

const zh_ul_loading_detail_desc = /** @type {(inputs: Ul_Loading_Detail_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请稍候，正在读取用户档案与消息记录。`)
};

/**
* | output |
* | --- |
* | "Please wait, loading user profile and messages." |
*
* @param {Ul_Loading_Detail_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_loading_detail_desc = /** @type {((inputs?: Ul_Loading_Detail_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Loading_Detail_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_loading_detail_desc(inputs)
	return zh_ul_loading_detail_desc(inputs)
});