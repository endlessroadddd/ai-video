/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_ExistingInputs */

const en_ul_tag_existing = /** @type {(inputs: Ul_Tag_ExistingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Existing Tags`)
};

const zh_ul_tag_existing = /** @type {(inputs: Ul_Tag_ExistingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`现有标签`)
};

/**
* | output |
* | --- |
* | "Existing Tags" |
*
* @param {Ul_Tag_ExistingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_existing = /** @type {((inputs?: Ul_Tag_ExistingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_ExistingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_existing(inputs)
	return zh_ul_tag_existing(inputs)
});