/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Manage_DescInputs */

const en_ul_tag_manage_desc = /** @type {(inputs: Ul_Tag_Manage_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Review existing tags and create or disable tag definitions for the current company.`)
};

const zh_ul_tag_manage_desc = /** @type {(inputs: Ul_Tag_Manage_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看现有标签，并为当前公司创建或停用标签定义。`)
};

/**
* | output |
* | --- |
* | "Review existing tags and create or disable tag definitions for the current company." |
*
* @param {Ul_Tag_Manage_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_manage_desc = /** @type {((inputs?: Ul_Tag_Manage_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Manage_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_manage_desc(inputs)
	return zh_ul_tag_manage_desc(inputs)
});