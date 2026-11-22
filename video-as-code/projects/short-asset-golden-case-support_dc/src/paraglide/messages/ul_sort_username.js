/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Sort_UsernameInputs */

const en_ul_sort_username = /** @type {(inputs: Ul_Sort_UsernameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username`)
};

const zh_ul_sort_username = /** @type {(inputs: Ul_Sort_UsernameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户名`)
};

/**
* | output |
* | --- |
* | "Username" |
*
* @param {Ul_Sort_UsernameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_sort_username = /** @type {((inputs?: Ul_Sort_UsernameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Sort_UsernameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_sort_username(inputs)
	return zh_ul_sort_username(inputs)
});