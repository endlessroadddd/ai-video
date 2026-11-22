/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Close_DetailInputs */

const en_ul_close_detail = /** @type {(inputs: Ul_Close_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close detail`)
};

const zh_ul_close_detail = /** @type {(inputs: Ul_Close_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭用户详情`)
};

/**
* | output |
* | --- |
* | "Close detail" |
*
* @param {Ul_Close_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_close_detail = /** @type {((inputs?: Ul_Close_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Close_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_close_detail(inputs)
	return zh_ul_close_detail(inputs)
});