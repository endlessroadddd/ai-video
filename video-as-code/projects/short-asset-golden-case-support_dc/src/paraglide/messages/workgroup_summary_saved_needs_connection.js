/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_Saved_Needs_ConnectionInputs */

const en_workgroup_summary_saved_needs_connection = /** @type {(inputs: Workgroup_Summary_Saved_Needs_ConnectionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup(s) saved. Reconnect this platform to continue.`)
};

const zh_workgroup_summary_saved_needs_connection = /** @type {(inputs: Workgroup_Summary_Saved_Needs_ConnectionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已保存 ${i?.count} 个工作群，当前平台需重新关联`)
};

/**
* | output |
* | --- |
* | "{count} workgroup(s) saved. Reconnect this platform to continue." |
*
* @param {Workgroup_Summary_Saved_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_saved_needs_connection = /** @type {((inputs: Workgroup_Summary_Saved_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_Saved_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_summary_saved_needs_connection(inputs)
	return zh_workgroup_summary_saved_needs_connection(inputs)
});