/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Update_ErrorInputs */

const en_ul_tag_update_error = /** @type {(inputs: Ul_Tag_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to update tag`)
};

const zh_ul_tag_update_error = /** @type {(inputs: Ul_Tag_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新标签失败`)
};

/**
* | output |
* | --- |
* | "Failed to update tag" |
*
* @param {Ul_Tag_Update_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_update_error = /** @type {((inputs?: Ul_Tag_Update_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Update_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_update_error(inputs)
	return zh_ul_tag_update_error(inputs)
});