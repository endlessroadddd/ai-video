/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Metric_AdminsInputs */

const en_billing_metric_admins = /** @type {(inputs: Billing_Metric_AdminsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admins`)
};

const zh_billing_metric_admins = /** @type {(inputs: Billing_Metric_AdminsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admins`)
};

/**
* | output |
* | --- |
* | "Admins" |
*
* @param {Billing_Metric_AdminsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_admins = /** @type {((inputs?: Billing_Metric_AdminsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_AdminsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_metric_admins(inputs)
	return zh_billing_metric_admins(inputs)
});