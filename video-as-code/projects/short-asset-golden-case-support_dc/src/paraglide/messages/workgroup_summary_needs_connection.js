/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Summary_Needs_ConnectionInputs */

const en_workgroup_summary_needs_connection = /** @type {(inputs: Workgroup_Summary_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect the platform first`)
};

const zh_workgroup_summary_needs_connection = /** @type {(inputs: Workgroup_Summary_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`需先完成平台关联`)
};

/**
* | output |
* | --- |
* | "Connect the platform first" |
*
* @param {Workgroup_Summary_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_needs_connection = /** @type {((inputs?: Workgroup_Summary_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_summary_needs_connection(inputs)
	return zh_workgroup_summary_needs_connection(inputs)
});