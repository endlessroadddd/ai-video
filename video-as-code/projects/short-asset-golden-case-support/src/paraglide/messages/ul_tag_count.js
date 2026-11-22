/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Ul_Tag_CountInputs */

const en_ul_tag_count = /** @type {(inputs: Ul_Tag_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} tags`)
};

const zh_ul_tag_count = /** @type {(inputs: Ul_Tag_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个标签`)
};

/**
* | output |
* | --- |
* | "{count} tags" |
*
* @param {Ul_Tag_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_count = /** @type {((inputs: Ul_Tag_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_count(inputs)
	return zh_ul_tag_count(inputs)
});