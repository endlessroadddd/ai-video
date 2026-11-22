/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Page_TitleInputs */

const en_cp_page_title = /** @type {(inputs: Cp_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Community Profile`)
};

const zh_cp_page_title = /** @type {(inputs: Cp_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区画像`)
};

/**
* | output |
* | --- |
* | "Community Profile" |
*
* @param {Cp_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_page_title = /** @type {((inputs?: Cp_Page_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Page_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_page_title(inputs)
	return zh_cp_page_title(inputs)
});