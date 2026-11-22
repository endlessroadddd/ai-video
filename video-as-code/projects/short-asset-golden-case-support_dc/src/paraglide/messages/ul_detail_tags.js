/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Detail_TagsInputs */

const en_ul_detail_tags = /** @type {(inputs: Ul_Detail_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag Details`)
};

const zh_ul_detail_tags = /** @type {(inputs: Ul_Detail_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签说明`)
};

/**
* | output |
* | --- |
* | "Tag Details" |
*
* @param {Ul_Detail_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_detail_tags = /** @type {((inputs?: Ul_Detail_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Detail_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_detail_tags(inputs)
	return zh_ul_detail_tags(inputs)
});