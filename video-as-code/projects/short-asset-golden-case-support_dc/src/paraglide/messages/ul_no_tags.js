/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_No_TagsInputs */

const en_ul_no_tags = /** @type {(inputs: Ul_No_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No tags`)
};

const zh_ul_no_tags = /** @type {(inputs: Ul_No_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无标签`)
};

/**
* | output |
* | --- |
* | "No tags" |
*
* @param {Ul_No_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_tags = /** @type {((inputs?: Ul_No_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_no_tags(inputs)
	return zh_ul_no_tags(inputs)
});