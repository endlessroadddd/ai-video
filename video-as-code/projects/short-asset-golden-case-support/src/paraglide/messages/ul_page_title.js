/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Page_TitleInputs */

const en_ul_page_title = /** @type {(inputs: Ul_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User List`)
};

const zh_ul_page_title = /** @type {(inputs: Ul_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户列表`)
};

/**
* | output |
* | --- |
* | "User List" |
*
* @param {Ul_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_page_title = /** @type {((inputs?: Ul_Page_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Page_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_page_title(inputs)
	return zh_ul_page_title(inputs)
});