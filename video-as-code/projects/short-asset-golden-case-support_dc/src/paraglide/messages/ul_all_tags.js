/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_All_TagsInputs */

const en_ul_all_tags = /** @type {(inputs: Ul_All_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Tags`)
};

const zh_ul_all_tags = /** @type {(inputs: Ul_All_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部标签`)
};

/**
* | output |
* | --- |
* | "All Tags" |
*
* @param {Ul_All_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_all_tags = /** @type {((inputs?: Ul_All_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_All_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_all_tags(inputs)
	return zh_ul_all_tags(inputs)
});