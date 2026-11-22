/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Workspace_Summary_SelectedInputs */

const en_workspace_summary_selected = /** @type {(inputs: Workspace_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup channel(s) selected`)
};

const zh_workspace_summary_selected = /** @type {(inputs: Workspace_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已标记 ${i?.count} 个工作群 channel`)
};

/**
* | output |
* | --- |
* | "{count} workgroup channel(s) selected" |
*
* @param {Workspace_Summary_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_summary_selected = /** @type {((inputs: Workspace_Summary_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Summary_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_summary_selected(inputs)
	return zh_workspace_summary_selected(inputs)
});