/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Status_InactiveInputs */

const en_ul_tag_status_inactive = /** @type {(inputs: Ul_Tag_Status_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inactive`)
};

const zh_ul_tag_status_inactive = /** @type {(inputs: Ul_Tag_Status_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未启用`)
};

/**
* | output |
* | --- |
* | "Inactive" |
*
* @param {Ul_Tag_Status_InactiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_status_inactive = /** @type {((inputs?: Ul_Tag_Status_InactiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Status_InactiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_status_inactive(inputs)
	return zh_ul_tag_status_inactive(inputs)
});