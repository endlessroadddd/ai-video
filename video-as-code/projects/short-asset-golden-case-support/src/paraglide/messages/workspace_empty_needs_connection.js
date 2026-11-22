/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Empty_Needs_ConnectionInputs */

const en_workspace_empty_needs_connection = /** @type {(inputs: Workspace_Empty_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finish the platform connection first, then come back to choose workgroups.`)
};

const zh_workspace_empty_needs_connection = /** @type {(inputs: Workspace_Empty_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先完成平台关联，再回来选择工作群。`)
};

/**
* | output |
* | --- |
* | "Finish the platform connection first, then come back to choose workgroups." |
*
* @param {Workspace_Empty_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_empty_needs_connection = /** @type {((inputs?: Workspace_Empty_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Empty_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_empty_needs_connection(inputs)
	return zh_workspace_empty_needs_connection(inputs)
});