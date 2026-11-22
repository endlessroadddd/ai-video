/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_AvailableInputs */

const en_workgroup_summary_available = /** @type {(inputs: Workgroup_Summary_AvailableInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Choose from ${i?.count} channel(s)`)
};

const zh_workgroup_summary_available = /** @type {(inputs: Workgroup_Summary_AvailableInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`可从 ${i?.count} 个频道中选择`)
};

/**
* | output |
* | --- |
* | "Choose from {count} channel(s)" |
*
* @param {Workgroup_Summary_AvailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_available = /** @type {((inputs: Workgroup_Summary_AvailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_AvailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_summary_available(inputs)
	return zh_workgroup_summary_available(inputs)
});