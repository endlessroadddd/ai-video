/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_TitleInputs */

const en_ul_detail_title = /** @type {(inputs: Ul_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User Profile`)
};

const zh_ul_detail_title = /** @type {(inputs: Ul_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户档案`)
};

/**
* | output |
* | --- |
* | "User Profile" |
*
* @param {Ul_Detail_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_title = /** @type {((inputs?: Ul_Detail_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_title(inputs)
	return zh_ul_detail_title(inputs)
});