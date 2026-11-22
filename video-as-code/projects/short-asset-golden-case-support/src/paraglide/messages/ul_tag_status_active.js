/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Status_ActiveInputs */

const en_ul_tag_status_active = /** @type {(inputs: Ul_Tag_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active`)
};

const zh_ul_tag_status_active = /** @type {(inputs: Ul_Tag_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用中`)
};

/**
* | output |
* | --- |
* | "Active" |
*
* @param {Ul_Tag_Status_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_status_active = /** @type {((inputs?: Ul_Tag_Status_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Status_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_status_active(inputs)
	return zh_ul_tag_status_active(inputs)
});