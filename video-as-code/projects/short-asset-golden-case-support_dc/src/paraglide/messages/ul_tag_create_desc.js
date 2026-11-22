/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Create_DescInputs */

const en_ul_tag_create_desc = /** @type {(inputs: Ul_Tag_Create_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New tags are synced to the filter list immediately and enabled by default.`)
};

const zh_ul_tag_create_desc = /** @type {(inputs: Ul_Tag_Create_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新建后会自动同步到用户列表页的标签筛选，默认立即启用。`)
};

/**
* | output |
* | --- |
* | "New tags are synced to the filter list immediately and enabled by default." |
*
* @param {Ul_Tag_Create_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_desc = /** @type {((inputs?: Ul_Tag_Create_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_create_desc(inputs)
	return zh_ul_tag_create_desc(inputs)
});