/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Extra_Platforms_LabelInputs */

const en_billing_export_extra_platforms_label = /** @type {(inputs: Billing_Export_Extra_Platforms_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Extra platform connections`)
};

const zh_billing_export_extra_platforms_label = /** @type {(inputs: Billing_Export_Extra_Platforms_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`额外接入平台`)
};

/**
* | output |
* | --- |
* | "Extra platform connections" |
*
* @param {Billing_Export_Extra_Platforms_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_extra_platforms_label = /** @type {((inputs?: Billing_Export_Extra_Platforms_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Extra_Platforms_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_extra_platforms_label(inputs)
	return zh_billing_export_extra_platforms_label(inputs)
});