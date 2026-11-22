/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Search_PlaceholderInputs */

const en_ul_search_placeholder = /** @type {(inputs: Ul_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search user_id / username / profile`)
};

const zh_ul_search_placeholder = /** @type {(inputs: Ul_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索 user_id / 用户名 / 用户画像`)
};

/**
* | output |
* | --- |
* | "Search user_id / username / profile" |
*
* @param {Ul_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_search_placeholder = /** @type {((inputs?: Ul_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_search_placeholder(inputs)
	return zh_ul_search_placeholder(inputs)
});