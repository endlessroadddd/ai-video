/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Summary_UnavailableInputs */

const en_workgroup_summary_unavailable = /** @type {(inputs: Workgroup_Summary_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable`)
};

const zh_workgroup_summary_unavailable = /** @type {(inputs: Workgroup_Summary_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂不可用`)
};

/**
* | output |
* | --- |
* | "Unavailable" |
*
* @param {Workgroup_Summary_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_summary_unavailable = /** @type {((inputs?: Workgroup_Summary_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Summary_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_summary_unavailable(inputs)
	return zh_workgroup_summary_unavailable(inputs)
});