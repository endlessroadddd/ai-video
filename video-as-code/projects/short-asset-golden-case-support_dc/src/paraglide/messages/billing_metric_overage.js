/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Metric_OverageInputs */

const en_billing_metric_overage = /** @type {(inputs: Billing_Metric_OverageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage`)
};

const zh_billing_metric_overage = /** @type {(inputs: Billing_Metric_OverageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage`)
};

/**
* | output |
* | --- |
* | "Overage" |
*
* @param {Billing_Metric_OverageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_overage = /** @type {((inputs?: Billing_Metric_OverageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_OverageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_metric_overage(inputs)
	return zh_billing_metric_overage(inputs)
});