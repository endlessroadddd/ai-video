/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Period_Export_HintInputs */

const en_billing_period_export_hint = /** @type {(inputs: Billing_Period_Export_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current period export can be archived directly.`)
};

const zh_billing_period_export_hint = /** @type {(inputs: Billing_Period_Export_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期导出可直接留档`)
};

/**
* | output |
* | --- |
* | "The current period export can be archived directly." |
*
* @param {Billing_Period_Export_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_period_export_hint = /** @type {((inputs?: Billing_Period_Export_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Period_Export_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_period_export_hint(inputs)
	return zh_billing_period_export_hint(inputs)
});