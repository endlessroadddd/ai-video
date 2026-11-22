/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Metric_PlatformsInputs */

const en_billing_metric_platforms = /** @type {(inputs: Billing_Metric_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platforms`)
};

const zh_billing_metric_platforms = /** @type {(inputs: Billing_Metric_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platforms`)
};

/**
* | output |
* | --- |
* | "Platforms" |
*
* @param {Billing_Metric_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_metric_platforms = /** @type {((inputs?: Billing_Metric_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Metric_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_metric_platforms(inputs)
	return zh_billing_metric_platforms(inputs)
});