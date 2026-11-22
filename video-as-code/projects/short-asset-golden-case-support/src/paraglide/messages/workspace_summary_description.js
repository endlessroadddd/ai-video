/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Summary_DescriptionInputs */

const en_workspace_summary_description = /** @type {(inputs: Workspace_Summary_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channels become available only after the platform is connected. Each platform can have multiple workgroups.`)
};

const zh_workspace_summary_description = /** @type {(inputs: Workspace_Summary_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只有先完成平台关联，才会出现对应平台的可选 channel。一个平台支持设置多个工作群。`)
};

/**
* | output |
* | --- |
* | "Channels become available only after the platform is connected. Each platform can have multiple workgroups." |
*
* @param {Workspace_Summary_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_summary_description = /** @type {((inputs?: Workspace_Summary_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Summary_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_summary_description(inputs)
	return zh_workspace_summary_description(inputs)
});