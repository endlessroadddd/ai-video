/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Member_Readonly_HintInputs */

const en_workspace_member_readonly_hint = /** @type {(inputs: Workspace_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can modify workgroup settings; Members can view the current configuration.`)
};

const zh_workspace_member_readonly_hint = /** @type {(inputs: Workspace_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可修改工作群设置；Member 可查看当前已配置的工作群。`)
};

/**
* | output |
* | --- |
* | "Only Owner/Admin can modify workgroup settings; Members can view the current configuration." |
*
* @param {Workspace_Member_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_member_readonly_hint = /** @type {((inputs?: Workspace_Member_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Member_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_member_readonly_hint(inputs)
	return zh_workspace_member_readonly_hint(inputs)
});