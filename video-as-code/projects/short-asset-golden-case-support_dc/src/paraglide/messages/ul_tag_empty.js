/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_EmptyInputs */

const en_ul_tag_empty = /** @type {(inputs: Ul_Tag_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No tags yet`)
};

const zh_ul_tag_empty = /** @type {(inputs: Ul_Tag_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无标签`)
};

/**
* | output |
* | --- |
* | "No tags yet" |
*
* @param {Ul_Tag_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_empty = /** @type {((inputs?: Ul_Tag_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_empty(inputs)
	return zh_ul_tag_empty(inputs)
});