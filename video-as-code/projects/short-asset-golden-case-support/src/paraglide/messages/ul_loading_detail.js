/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Loading_DetailInputs */

const en_ul_loading_detail = /** @type {(inputs: Ul_Loading_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading user details`)
};

const zh_ul_loading_detail = /** @type {(inputs: Ul_Loading_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载用户详情`)
};

/**
* | output |
* | --- |
* | "Loading user details" |
*
* @param {Ul_Loading_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_loading_detail = /** @type {((inputs?: Ul_Loading_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Loading_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_loading_detail(inputs)
	return zh_ul_loading_detail(inputs)
});