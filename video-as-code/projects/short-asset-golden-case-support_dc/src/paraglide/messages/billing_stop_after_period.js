/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Stop_After_PeriodInputs */

const en_billing_stop_after_period = /** @type {(inputs: Billing_Stop_After_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stops after the current billing period`)
};

const zh_billing_stop_after_period = /** @type {(inputs: Billing_Stop_After_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期结束后停止`)
};

/**
* | output |
* | --- |
* | "Stops after the current billing period" |
*
* @param {Billing_Stop_After_PeriodInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stop_after_period = /** @type {((inputs?: Billing_Stop_After_PeriodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stop_After_PeriodInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_stop_after_period(inputs)
	return zh_billing_stop_after_period(inputs)
});