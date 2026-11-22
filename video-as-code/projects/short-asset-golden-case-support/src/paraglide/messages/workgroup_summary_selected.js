/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_SelectedInputs */

const en_workgroup_summary_selected = /** @type {(inputs: Workgroup_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup(s) configured`)
};

const zh_workgroup_summary_selected = /** @type {(inputs: Workgroup_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已设置 ${i?.count} 个工作群`)
};

/**
* | output |
* | --- |
* | "{count} workgroup(s) configured" |
*
* @param {Workgroup_Summary_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_selected = /** @type {((inputs: Workgroup_Summary_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_summary_selected(inputs)
	return zh_workgroup_summary_selected(inputs)
});