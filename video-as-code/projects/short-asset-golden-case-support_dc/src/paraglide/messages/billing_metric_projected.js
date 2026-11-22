/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Metric_ProjectedInputs */

const en_billing_metric_projected = /** @type {(inputs: Billing_Metric_ProjectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected`)
};

const zh_billing_metric_projected = /** @type {(inputs: Billing_Metric_ProjectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected`)
};

/**
* | output |
* | --- |
* | "Projected" |
*
* @param {Billing_Metric_ProjectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_projected = /** @type {((inputs?: Billing_Metric_ProjectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_ProjectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_metric_projected(inputs)
	return zh_billing_metric_projected(inputs)
});